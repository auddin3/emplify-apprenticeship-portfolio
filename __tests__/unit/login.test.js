const userLogin = require('../../server/controllers/login')
const db = require('../../server/config/database')

describe('User Login', () => {

  // Connect to the database before running any tests
  beforeAll(async () => {
    await db.connectToDatabase()
  })
  
  // Test case for valid user login
  test('Valid username and password should authenticate user', async () => {
    const email = 'qmul@qmul.ac.uk'
    const password = 'QMUL'
    const isAuthenticated = await userLogin.authenticateUser(email, password)
    expect(isAuthenticated).toBe(true)
  })

  // Test case for invalid username
  test('Invalid username should not authenticate user', async () => {
    const email = 'invalid@example.com'
    const password = 'password'
    const isAuthenticated = await userLogin.authenticateUser(email, password)
    expect(isAuthenticated).toBe(false)
  })

  // Test case for invalid password
  test('Invalid password should not authenticate user', async () => {
    const email = 'qmul@qmul.ac.uk'
    const password = 'invalid'
    const isAuthenticated = await userLogin.authenticateUser(email, password)
    expect(isAuthenticated).toBe(false)
  })

  // Test case for missing username
  test('Missing username should not authenticate user', async () => {
    const password = 'password'
    const isAuthenticated = await userLogin.authenticateUser(undefined, password)
    expect(isAuthenticated).toBe(false)
  })

  // Test case for missing password
  test('Missing password should not authenticate user', async () => {
    const email = 'qmul@qmul.ac.uk'
    const isAuthenticated = await userLogin.authenticateUser(email, undefined)
    expect(isAuthenticated).toBe(false)
  })

  // Test case for empty email and password
  test('Empty email and password should not authenticate user', async () => {
    const email = ''
    const password = ''
    const isAuthenticated = await userLogin.authenticateUser(email, password)
    expect(isAuthenticated).toBe(false)
  })

  // Test case for invalid email format
  test('Invalid email format should not authenticate user', async () => {
    const email = 'invalidemail'
    const password = 'password'
    const isAuthenticated = await userLogin.authenticateUser(email, password)
    expect(isAuthenticated).toBe(false)
  })
})


