const request = require('supertest')
const db = require('../../server/config/database')

const API_CONNECTION = 'http://localhost:5001'

describe('Login Controller Integration Tests', () => {
    beforeAll(async () => {
        await db.connectToDatabase()
    })

    afterAll(async () => {
        await db.close()
    })

  describe('Login', () => {
    it('should authenticate user and return token', async () => {
      const response = await request(API_CONNECTION)
        .post('/login')
        .send({ email: 'qmul@qmul.ac.uk', password: 'QMUL' })
      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('token')
      expect(response.body).toHaveProperty('user')
    })

    it('should handle invalid credentials', async () => {
      const response = await request(API_CONNECTION)
        .post('/login')
        .send({ email: 'invalid@example.com', password: 'invalidpassword' })
      expect(response.status).toBe(400)
      expect(response.body).toEqual({ message: 'Invalid email or password' })
    })
  })

  describe('Get All Users', () => {
    it('should retrieve all users', async () => {
      const response = await request(API_CONNECTION).get('/users')
      expect(response.status).toBe(200)
      response.body.users.forEach(user => {
        expect(user).toHaveProperty("_id")
        expect(user).toHaveProperty("name")
        expect(user).toHaveProperty("email")
      })
    })
  })
})
