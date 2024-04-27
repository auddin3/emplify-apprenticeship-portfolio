const request = require('supertest')
const db = require('../../server/config/database')

const API_CONNECTION = 'http://localhost:5001'
const COLLECTION_NAME = 'portfolios'

describe('Portfolio Controller Integration Tests', () => {
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

    describe('getUserPortfolios', () => {
        it('should return user portfolios', async () => {
          
          const response = await request(API_CONNECTION).get('/portfolios/65e346143c16c0c823b13fe5')
          expect(response.status).toBe(200)
          expect(response.body.portfolios.length).toBe(2)
        })
    })

    // describe('updatePortfolio', () => {
    //     it('should update portfolio', async () => {
    //         const response = await request(API_CONNECTION)
    //         .post(`/portfolio/65db659ad8c16c7a6b9974fc`)
    //         .send({ 
    //             name: 'Updated Title', 
    //             description: 'This is a test', 
    //             specification: ['C1', 'C4'] 
    //         })

    //         expect(response.status).toBe(200)
    //         expect(response.body.portfolio.name).toBe('Updated Title')
    //         expect(response.body.portfolio.description).toBe('This is a test')
    //         expect(response.body.portfolio.specification).toEqual(['C1', 'C4'] )
    //     })
    // })

    describe('getEntries', () => {
      it('should return all portfolio entries', async () => {
        const response = await request(API_CONNECTION).get('/entries')
        expect(response.status).toBe(200)
      })
    })

    describe('getPortfolioEntries', () => {
        it('should return portfolio entries', async () => {
          
          const response = await request(API_CONNECTION).get(`/portfolio/65db659ad8c16c7a6b9974fc`)
          expect(response.status).toBe(200)
        })
    })

    describe('insertPortfolioEntry', () => {
      it('should insert a new portfolio entry', async () => {
        
        const response = await request(API_CONNECTION)
          .put(`/portfolioEntry/65db659ad8c16c7a6b9974fc`)
          .send({ 
            skill: 'C1', 
            module: 'MOCK101', 
            dateCreated: new Date(), 
            q1: 'test',
            q2: 'test',
            q3: 'test',
            q4: 'test',
            user: '65e346143c16c0c823b13fe5',
            mockAssessment: 0.4,
          })
  
        expect(response.status).toBe(200)
      })
    })

    describe('updatePortfolioEntry', () => {
      it('should update a portfolio entry', async () => {
        const entry = await db.getDb().collection('portfolioEntries').findOne({ module: 'MOCK101' })
        const response = await request(API_CONNECTION)
          .post(`/portfolioEntry/${entry._id}`)
          .send({ 
            q1: 'new test',
            q2: 'new test',
            q3: 'new test',
            q4: 'new test',
          })

        expect(response.status).toBe(200)
        expect(response.body.find(e => e.module === entry.module).q1).toBe('new test')
      })
    })

    describe('deletePortfolioEntry', () => {
      it('should delete a portfolio entry', async () => {
        const entry = await db.getDb().collection('portfolioEntries').findOne({ module: 'MOCK101' })

        const response = await request(API_CONNECTION).delete(`/portfolioEntry/${entry._id}`)
        expect(response.status).toBe(200)
      })
    })

  }
)