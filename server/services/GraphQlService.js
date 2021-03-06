import jwt from 'jsonwebtoken'
import uuid4 from 'uuid4'
import axios from 'axios'
import CAPABILITIES from '../../data/capabilities.json'
import UNIVERSAL_PROPERTIES from '../../data/universalProperties.json'
import cache from '../cache'

export default class GraphQlService {
  graphQlApiConfig = null
  accessToken = null

  constructor(graphQlApiConfig, accessToken) {
    this.graphQlApiConfig = graphQlApiConfig
    this.accessToken = accessToken
  }

  buildQuery(properties = []) {
    const capabilities = {}
    properties.forEach((propertyUniqueId) => {
      const [capabilityName, propertyName] = propertyUniqueId.split('.')
      if (capabilities[capabilityName]) {
        capabilities[capabilityName].push(propertyName)
      } else {
        capabilities[capabilityName] = [propertyName]
      }
    })

    const capabilityQueries = Object.entries(capabilities).map(
      ([capabilityName, properties]) => {
        const capabilityConfig =
          capabilityName === 'universal'
            ? { properties: UNIVERSAL_PROPERTIES }
            : Object.values(CAPABILITIES).find(
                (capability) => capability.name_cased === capabilityName
              )
        const propertyQueries = properties.map((propertyName) => {
          const propertyConfig =
            capabilityConfig.properties.find(
              (p) => p.name_cased === propertyName
            ) ||
            UNIVERSAL_PROPERTIES.find(
              (universalProp) => universalProp.name_cased === propertyName
            )

          const propertyQuery = propertyConfig.items
            ? `{ data { ${propertyConfig.items
                .map((item) => {
                  if (item.items) {
                    return `${item.name_cased} { ${item.items
                      .map((subItem) =>
                        subItem.unit
                          ? `${subItem.name_cased} { value unit }`
                          : subItem.name_cased
                      )
                      .join(' ')} }`
                  }

                  return item.unit
                    ? `${item.name_cased} { value unit }`
                    : item.name_cased
                })
                .join(' ')} } timestamp }`
            : `{ data ${
                propertyConfig.type.includes('unit') ? '{ value, unit }' : ''
              } timestamp }`

          return `${propertyName} ${propertyQuery}`
        })

        return `${capabilityName} { ${propertyQueries.join(' ')} }`
      }
    )

    return `{${capabilityQueries.join(', ')}}`
  }

  async getSchema() {
    const cachedSchema = cache.get('schema')
    if (cachedSchema) {
      return cachedSchema
    }

    const jwtToken = this.generateJWT()
    const {
      data: { data: schema, errors },
    } = await axios.post(
      this.graphQlApiConfig.app_uri,
      {
        query: '{ __schema { types { name fields { name } } } }',
      },
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          'Content-Type': 'application/json',
        },
      }
    )

    if (errors || !schema || !schema.__schema || !schema.__schema.types) {
      console.log('Failed to fetch graphql schema', errors)
      return null
    }

    cache.set('schema', schema, 1800) // Cache for 30min

    return schema
  }

  async validateProperties(properties) {
    const schema = await this.getSchema()

    return properties.filter((propertyId) => {
      const [capabilityName, propertyName] = propertyId.split('.')

      return schema.__schema.types.find(
        ({ name, fields }) =>
          name.toLowerCase() === capabilityName.toLowerCase() &&
          fields.find(
            ({ name }) => name.toLowerCase() === propertyName.toLowerCase()
          )
      )
    })
  }

  async fetchProperties(properties = []) {
    if (properties.length === 0) {
      return {}
    }

    const validProperties = await this.validateProperties(properties)
    const query = this.buildQuery(validProperties)
    const jwtToken = this.generateJWT()

    const {
      data: { data, errors },
    } = await axios.post(
      this.graphQlApiConfig.app_uri,
      {
        query,
      },
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          'Content-Type': 'application/json',
        },
      }
    )

    const errorMessage =
      errors && Array.isArray(errors) && errors.length > 0 && errors[0].message
    if (errorMessage) {
      throw new Error(errorMessage)
    }

    return data
  }

  generateJWT() {
    const payload = {
      ver: this.graphQlApiConfig.version,
      iss: this.graphQlApiConfig.client_serial_number.toUpperCase(),
      sub: this.accessToken,
      aud: this.graphQlApiConfig.app_uri,
      iat: Math.round(Date.now() / 1000),
      jti: uuid4(),
    }

    const privateKey = Buffer.from(this.graphQlApiConfig.private_key, 'utf8')
    const jwtToken = jwt.sign(payload, privateKey, {
      algorithm: 'ES256',
    })

    return jwtToken
  }
}
