const userRegistration = require('../server/controllers/register')
const db = require('../server/config/database')

describe('User Registration', () => {
  // Connect to the database before running any tests
  beforeAll(async () => {
    await db.connectToDatabase()
  })

  test('Register with valid information', async () => {
    const name = 'Test User'
    const email = 'test@example.com'
    const password = 'strongPassword123'
    const school = "Queen Mary's University of London"

    const result = await userRegistration.registerUser(name, email, password, school)
    expect(result.success).toBe(true)
  })

  test('Register with existing email', async () => {
    const name = 'Test User'
    const email = 'qmul@qmul.ac.uk'
    const password = 'strongPassword123'
    const school = "Queen Mary's University of London"

    const result = await userRegistration.registerUser(name, email, password, school)
    expect(result.success).toBe(false)
    expect(result.message).toBe('Email already exists')
  })

  test('Register with weak password', async () => {
    const name = 'Test User'
    const email = 'test@example.com'
    const password = 'weak'
    const school = "Queen Mary's University of London"

    const result = await userRegistration.registerUser(name, email, password, school)
    expect(result.success).toBe(false)
    expect(result.message).toBe('Password is too weak')
  })

  test('Register with invalid email format', async () => {
    const name = 'Test User'
    const email = 'testuser123'
    const password = 'weak'
    const school = "Queen Mary's University of London"

    const result = await userRegistration.registerUser(name, email, password, school)
    expect(result.success).toBe(false)
    expect(result.message).toBe('Invalid email format')
  })
})
