const request = require('supertest')
const db = require('../../server/config/database')

const API_CONNECTION = 'http://localhost:5001'

describe('Grade Controller Integration Tests', () => {
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

    describe('GET user grades', () => {
        it('should return user grades', async () => {

            const response = await request(API_CONNECTION).get('/grades/65e346143c16c0c823b13fe5')

            expect(response.status).toBe(200)
        })

        it('should handle errors', async () => {
            const response = await request(API_CONNECTION).get('/grades/123')

            expect(response.status).toBe(500)
            expect(response.body).toEqual({ message: 'Internal Server Error' })
        })
    })

    describe('DELETE user grades', () => {
        it('should delete user grades', async () => {
    
          const response = await request(API_CONNECTION).delete('/grades/65e346143c16c0c823b13fe5').send({ module: 'MOCK101' })
    
          expect(response.status).toBe(200)
        })
    
        it('should handle errors', async () => {
          const response = await request(API_CONNECTION).delete('/grades/123').send({ module: 'math' })
    
          expect(response.status).toBe(500)
          expect(response.body).toEqual({ message: 'Internal Server Error' })
        })
      })

})
