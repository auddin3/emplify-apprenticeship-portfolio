const request = require('supertest')
const db = require('../../server/config/database')

const API_CONNECTION = 'http://localhost:5001'
const COLLECTION_NAME = 'users'

describe('Register Controller Integration Tests', () => {
    beforeAll(async () => {
        await db.connectToDatabase()
        await db.getDb().collection(COLLECTION_NAME).deleteMany({ email: 'john@example.com' })
    })

    afterAll(async () => {
        await  db.getDb().collection(COLLECTION_NAME).deleteMany({ email: 'john@example.com' })
        await db.close()
    })

  describe('Register User', () => {
    it('should register user with valid details', async () => {
      const response = await request(API_CONNECTION)
        .post('/register')
        .send({
          name: 'John Doe',
          email: 'john@example.com',
          password: 'StrongPassword123',
          school: "Queen Mary's University of London"
        })

      expect(response.status).toBe(200)
      expect(response.body).toEqual({ message: 'Successful registration' })

      const user = await db.getDb().collection(COLLECTION_NAME).findOne({ email: 'john@example.com' })
      expect(user).toBeTruthy()
      expect(user.name).toBe('John Doe')
    })

    it('should reject registration with invalid email format', async () => {
      const response = await request(API_CONNECTION)
        .post('/register')
        .send({
          name: 'Invalid Email',
          email: 'invalidemail',
          password: 'StrongPassword123',
          school: 'Example School'
        })
      expect(response.status).toBe(500)
      expect(response.body).toEqual({ error: 'Invalid email format' })
    })

    it('should reject registration if email already exists', async () => {
    //   await db.collection(collectionName).insertOne({
    //     name: 'John Doe',
    //       email: 'john@example.com',
    //       password: 'StrongPassword123',
    //       school: "Queen Mary's University of London"
    //   })

      const response = await request(API_CONNECTION)
        .post('/register')
        .send({
            name: 'John Doe',
            email: 'john@example.com',
            password: 'StrongPassword123',
            school: "Queen Mary's University of London"
          })
      expect(response.status).toBe(500)
      expect(response.body).toEqual({ error: 'Email already exists' })
    })

    it('should reject registration with weak password', async () => {
      const response = await request(API_CONNECTION)
        .post('/register')
        .send({
          name: 'Weak Password',
          email: 'weakpassword@example.com',
          password: 'weak',
          school: 'Example School'
        })
      expect(response.status).toBe(500)
      expect(response.body).toEqual({ error: 'Password is too weak' })
    })
  })
})
