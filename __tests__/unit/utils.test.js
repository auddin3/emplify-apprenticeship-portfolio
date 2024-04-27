const {
  handleSort,
  handleSearch,
  calculateDateDifference,
  camelCaseToSpaced,
  convertDateToString,
  capitalize,
  generateRandomString,
} = require('../../client/src/utils')


describe('calculateDateDifference', () => {
  test('calculates the difference between two dates correctly', () => {
    const currentDate = new Date()
    const targetDate = new Date(currentDate.getTime() + (5 * 24 * 60 * 60 * 1000)) // 5 days from now
    expect(calculateDateDifference(targetDate)).toBe(5)
  })
})

describe('camelCaseToSpaced', () => {
  test('converts camelCase string to spaced string', () => {
    expect(camelCaseToSpaced('camelCaseString')).toBe('Camel Case String')
  })

  test('handles empty string', () => {
    expect(camelCaseToSpaced('')).toBe(undefined)
  })
})

describe('convertDateToString', () => {
  test('converts date to string with default options', () => {
    const date = new Date(2024, 3, 26) // April 26, 2024
    expect(convertDateToString(date)).toBe('26/04/2024')
  })

  test('converts date to string with custom options', () => {
    const date = new Date(2024, 3, 26) // April 26, 2024
    const options = { day: 'numeric', month: 'long', year: 'numeric' }
    expect(convertDateToString(date, options)).toBe('26 April 2024')
  })
})

describe('capitalize', () => {
  test('capitalizes the first letter of each word in a string', () => {
    expect(capitalize('hello world')).toBe('Hello World')
  })

  test('handles empty string', () => {
    expect(capitalize('')).toBe('')
  })
})

describe('generateRandomString', () => {
  test('generates a random string of specified length', () => {
    expect(generateRandomString(10)).toHaveLength(10)
  })

  test('generates a random string with alphanumeric characters', () => {
    const randomString = generateRandomString(10)
    const alphanumericRegex = /^[a-zA-Z0-9]+$/
    expect(alphanumericRegex.test(randomString)).toBe(true)
  })
})

