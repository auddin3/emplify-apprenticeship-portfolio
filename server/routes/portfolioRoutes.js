const express = require('express')
const router = express.Router()
const mongodb = require('mongodb')

const portfolioController = require('../controllers/portfolio')

const ObjectId = mongodb.ObjectId

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
    const { specification } = await portfolioController.getPortfolioCriterion(pid)
    const { entries } = await portfolioController.getPortfolioEntries(pid)

    return res.json({ specification, entries })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

router.get('/entries', async function (req, res) {
  try {
    const { entries } = await portfolioController.getEntries()

    return res.json({ entries })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

router.post('/portfolioEntry/:pid', async function (req, res) {
  const pid = new ObjectId(req.params.pid)
  const formattedEntry = req.body

  try {
    const { entries } = await portfolioController.updatePortfolioEntry(pid, formattedEntry)
    return res.json(entries)
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

router.delete('/portfolioEntry/:pid', async function (req, res) {
  const pid = new ObjectId(req.params.pid)

  try {
    const { entries } = await portfolioController.deletePortfolioEntry(pid)
    return res.json(entries)
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

module.exports = router
