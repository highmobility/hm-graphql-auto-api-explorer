import crypto from 'crypto'

export default class Crypto {
  static validateSecret(request, secret) {
    const signature = request.headers['X-HM-Signature']
    if (!signature) {
      return false
    }

    const expectedSignature =
      'sha1=' +
      crypto
        .createHmac('sha1', secret)
        .update(JSON.stringify(request.body))
        .digest('hex')

    const a = Buffer.from(signature)
    const b = Buffer.from(expectedSignature)
    return crypto.timingSafeEqual(a, b)
  }

  static randomString() {
    return crypto.randomBytes(64).toString('hex').substring(0, 30)
  }
}
