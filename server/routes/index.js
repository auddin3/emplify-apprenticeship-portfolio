const express = require('express')
const router = express.Router()
const mongodb = require('mongodb')

const portfolioController = require('../controllers/portfolio')

const ObjectId = mongodb.ObjectId

// Define main route
router.get('/', (req, res) => {
  res.send('Welcome to the API!')
})

router.get('/dashboard/:uid', async function (req, res) {
  const uid = new ObjectId(req.params.uid)

  try {
    const portfolios = await portfolioController.getUserPortfolios(res, uid)
    return res.json(portfolios)
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

module.exports = router
