import jwt from 'jwt'
import uuid4 from 'uuid4'

export function generateJWT(
  privateKey,
  privateKeyId,
  appUrl,
  appId,
  clientSerialNumber
) {
  const REST_API_CONFIG = {
    version: '2.0',
    type: 'rest_api',
    private_key_id: '4ac6ebda-efdf-4f2e-8c53-cf27e3ce7f27',
    private_key:
      '-----BEGIN PRIVATE KEY-----\nMIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgaL4l2cOjGIygxdMh\nEr7PRd7xVV707KKlsR546KaMNtOhRANCAASNUqCakHD3+WHDOI3F9yTx6Ok4fFeK\nSstonpljta/EbIM4zxCrobVMgfWzQAT9TIfsv4Bs1N8Dd3aWp9pPOycA\n-----END PRIVATE KEY-----\n\n',
    app_uri: 'https://sandbox.graphql-api.develop.high-mobility.net',
    app_id: '40AAAAC3C6467F0393FFD528',
    client_serial_number: 'fc2e6591408076a340',
  }

  const payload = {
    ver: REST_API_CONFIG.version,
    iss: REST_API_CONFIG.client_serial_number.toUpperCase(),
    sub: accessToken,
    aud: REST_API_CONFIG.app_uri,
    iat: Math.round(Date.now() / 1000),
    jti: uuid4(),
  }

  const privateKey = Buffer.from(REST_API_CONFIG.private_key, 'utf8')
  const jwtToken = jwt.sign(payload, privateKey, {
    algorithm: 'ES256',
  })

  return jwtToken
}
