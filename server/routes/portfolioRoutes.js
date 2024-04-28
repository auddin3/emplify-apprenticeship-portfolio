const express = require('express')
const router = express.Router()
const mongodb = require('mongodb')

const portfolioController = require('../controllers/portfolio')
const gradeController = require('../controllers/grade')

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
    const { entries } = await portfolioController.getPortfolioEntries(pid)

    return res.json({ entries })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

router.put('/portfolio/:uid', async function (req, res) {
  const uid = new ObjectId(req.params.uid)
  const portfolioData = req.body
  try {
    await portfolioController.createPortfolio(uid, portfolioData)
    const { portfolios } = await portfolioController.getUserPortfolios(uid)

    return res.json({ portfolios })
  } catch (error) {
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

router.post('/portfolio/:pid', async function (req, res) {
  const pid = new ObjectId(req.params.pid)
  const updatedPortfolioData = req.body

  try {
    const updatedPortfolio = await portfolioController.updatePortfolio(pid, updatedPortfolioData)
    const updatedPortfolioEntries = await portfolioController.getPortfolioEntries(pid)

    return res.json({ portfolio: updatedPortfolio, entries: updatedPortfolioEntries })
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

router.put('/portfolioEntry/:pid', async function (req, res) {
  const { skill, module, dateCreated, q1, q2, q3, q4, user, ...assessments } = req.body
  const pid = new ObjectId(req.params.pid)
  const uid = new ObjectId(String(user))
  const formattedDateCreated = new Date(dateCreated)

  const newEntry = { portfolio: pid, skill, module, dateCreated: formattedDateCreated, q1, q2, q3, q4 }

  const formattedGrades = Object.entries(assessments).map(([activity, grade]) => ({
    activity,
    grade: parseFloat(grade) / 100,
  }))

  const gradeRecord = { module, grades: formattedGrades, user: uid }

  try {
    const { entries } = await portfolioController.insertPortfolioEntry(newEntry)
    const { grades } = await gradeController.insertUserGrade(gradeRecord)
    return res.json({ entries, grades })
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
