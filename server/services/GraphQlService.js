import jwt from 'jsonwebtoken'
import uuid4 from 'uuid4'
import axios from 'axios'
import CAPABILITIES from '../../client/src/data/capabilities.json'
import UNIVERSAL_PROPERTIES from '../../client/src/data/universalProperties.json'

export default class GraphQlService {
  graphQlApiConfig = null
  accessToken = null

  constructor(graphQlApiConfig, accessToken) {
    this.graphQlApiConfig = graphQlApiConfig
    this.accessToken = accessToken
  }

  buildQuery(properties = []) {
    const capabilities = {}
    properties.forEach((property) => {
      const [capabilityName, propertyName] = property.split('.')
      capabilities[capabilityName]
        ? capabilities[capabilityName].push(propertyName)
        : (capabilities[capabilityName] = [propertyName])
    })

    const capabilityQueries = Object.entries(capabilities).map(
      ([capabilityName, properties]) => {
        const capabilityConfig = Object.values(CAPABILITIES).find(
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
                .map((i) => i.name_cased)
                .join(',')} } }`
            : `{ data ${
                propertyConfig.type.includes('unit') ? '{ value, unit }' : ''
              } }`

          return `${propertyName} ${propertyQuery}`
        })

        return `${capabilityName} { ${propertyQueries.join(', ')} }`
      }
    )

    return `{${capabilityQueries.join(', ')}}`
  }

  async fetchProperties(properties = []) {
    if (properties.length === 0) {
      return []
    }

    const query = this.buildQuery(properties)
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
