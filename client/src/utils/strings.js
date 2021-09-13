import { camelCase, startCase } from 'lodash'

export function camelCaseToWords(string = '') {
  if (!string) return ''

  if (`${string}`.toUpperCase() === string) {
    return string
  }

  const result = `${string}`.replace(/([A-Z])/g, ' $1')
  return result.charAt(0).toUpperCase() + result.slice(1).toLowerCase()
}

export function camelCaseToSnakeCase(string = '') {
  return string.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)
}
