const request = require('supertest')
const db = require('../../server/config/database')

const API_CONNECTION = 'http://localhost:5001'

describe('Skills Controller Integration Tests', () => {
    beforeAll(async () => {
        await db.connectToDatabase()
    })

    afterAll(async () => {
        await db.close()
    })

    describe('GET modules', () => {
        it('should return all modules', async () => {

            const response = await request(API_CONNECTION).get('/modules')
            expect(response.status).toBe(200)
        })
    })

})