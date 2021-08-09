import appConfig from '../config'
import jwt from 'jsonwebtoken'
import uuid4 from 'uuid4'
import axios from 'axios'
import CAPABILITIES from '../../client/src/data/capabilities.json'

export default class GraphQlService {
  accessToken = null
  appId = null
  env = null

  constructor(accessToken, appId, env) {
    this.accessToken = accessToken
    this.appId = appId
    this.env = env
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
        const propertyQueries = properties.map((propertyName) => {
          const propertyConfig = CAPABILITIES[capabilityName].properties.find(
            (p) => p.name_cased === propertyName
          )

          const propertyQuery = propertyConfig.items
            ? propertyConfig.items
                .map(
                  (item) =>
                    `${item.name} { data ${
                      propertyConfig.type.includes('unit')
                        ? '{ value, unit }'
                        : ''
                    } }`
                )
                .join(',')
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

  getEndpoint() {
    return this.env === appConfig.appEnvironments.DEVELOP
      ? appConfig.graphQlApiDevelopUrl
      : appConfig.graphQlApiProductionUrl
  }

  async fetchProperties(properties = []) {
    if (properties.length === 0) {
      return []
    }

    const query = this.buildQuery(properties)
    const jwtToken = this.generateJWT()

    const { data } = await axios.post(
      this.getEndpoint(),
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

    return data
  }

  generateJWT() {
    // auth flow:
    // 1. use oAuthUrl, oAuthClientId, appId, oAuthRedirectURI to get oAuthCode
    // 2. use oAuthTokenUrl, oAuthCode, oAuthRedirectURI, oAuthClientId, oAuthClientSecret to get accessToken
    // 3. use accessToken, graphQLConfig(version, type, private_key, client_serial_number ) to generate graphQL JWT

    // current app config fields: appId, clientPrivateKey, clientCertificate
    // new app config fields: graphQlConfig.app_id, graphQlConfig.version, graphQlConfig.private_key, graphQlConfig.client_serial_number (temporarily use REST one and hardcode some values)

    // This cannot be copied as of now
    const GRAPHQL_API_CONFIG = {
      version: '2.0',
      app_id: this.appId,
      client_serial_number: 'fc2e6591408076a340'.toUpperCase(),
      private_key:
        '-----BEGIN PRIVATE KEY-----\nMIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgaL4l2cOjGIygxdMh\nEr7PRd7xVV707KKlsR546KaMNtOhRANCAASNUqCakHD3+WHDOI3F9yTx6Ok4fFeK\nSstonpljta/EbIM4zxCrobVMgfWzQAT9TIfsv4Bs1N8Dd3aWp9pPOycA\n-----END PRIVATE KEY-----\n\n',
    }

    const payload = {
      ver: GRAPHQL_API_CONFIG.version,
      iss: GRAPHQL_API_CONFIG.client_serial_number.toUpperCase(),
      sub: this.accessToken,
      aud: this.getEndpoint(),
      iat: Math.round(Date.now() / 1000),
      jti: uuid4(),
    }

    const privateKey = Buffer.from(GRAPHQL_API_CONFIG.private_key, 'utf8')
    const jwtToken = jwt.sign(payload, privateKey, {
      algorithm: 'ES256',
    })

    return jwtToken
  }
}
