const request = require('supertest')
const db = require('../../server/config/database')

const API_CONNECTION = 'http://localhost:5001'

describe('Module Controller Integration Tests', () => {
    beforeAll(async () => {
        await db.connectToDatabase()
    })

    afterAll(async () => {
        await request(API_CONNECTION)
            .post(`/portfolio/65db659ad8c16c7a6b9974fc`)
            .send({ 
                name: 'BSC Accounting and Finance', 
                description: 'Lorem Ipsulum palet', 
                specification: ['C1', 'C4'] 
            })
        await db.close()
    })

    describe('GET modules', () => {
        it('should return all modules', async () => {

            const response = await request(API_CONNECTION).get('/modules')
            expect(response.status).toBe(200)
        })
    })

})