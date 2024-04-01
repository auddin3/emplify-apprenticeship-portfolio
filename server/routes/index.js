const express = require('express')
const router = express.Router()
const mongodb = require('mongodb')

const portfolioController = require('../controllers/portfolio')
const skillController = require('../controllers/skill')
const moduleController = require('../controllers/module')

const ObjectId = mongodb.ObjectId

// Define main route
router.get('/', (req, res) => {
  res.send('Welcome to the API!')
})

router.get('/dashboard/:uid', async function (req, res) {
  const uid = new ObjectId(req.params.uid)

  try {
    const { portfolios } = await portfolioController.getUserPortfolios(uid)

    const skillIds = portfolios.reduce((acc, obj) => {
      return Array.from(new Set([...acc, ...obj.specification]))
    }, [])

    const { skills } = await skillController.getSkills(skillIds)

    return res.json({ portfolios, skills })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

router.get('/portfolios/:uid', async function (req, res) {
  const uid = new ObjectId(req.params.uid)

  try {
    const { portfolios } = await portfolioController.getUserPortfolios(uid)

    return res.json({ portfolios })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

router.get('/portfolio/:pid', async function (req, res) {
  const pid = new ObjectId(req.params.pid)

  try {
    const specification = await portfolioController.getPortfolioCriterion(pid)

    return res.json(specification)
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

router.get('/modules', async function (req, res) {
  try {
    const { modules } = await moduleController.getAllModules()

    return res.json({ modules })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

module.exports = router
