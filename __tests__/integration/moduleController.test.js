const request = require('supertest')
const db = require('../../server/config/database')

const API_CONNECTION = 'http://localhost:5001'

describe('Module Controller Integration Tests', () => {
    beforeAll(async () => {
        await db.connectToDatabase()
    })

    afterAll(async () => {
        await db.close()
    })

    describe('GET skills', () => {
        it('should return all skills', async () => {

            const response = await request(API_CONNECTION).get('/skills')
            expect(response.status).toBe(200)
        })
    })

})