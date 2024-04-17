const express = require('express')
const router = express.Router()
const mongodb = require('mongodb')

const portfolioController = require('../controllers/portfolio')
const skillController = require('../controllers/skill')

const ObjectId = mongodb.ObjectId

// Define main route
router.get('/', (req, res) => {
  res.send('Welcome to the API!')
})

router.get('/dashboard/:uid', async function (req, res) {
  const uid = new ObjectId(req.params.uid)

  try {
    const { portfolios } = await portfolioController.getUserPortfolios(uid)

    let combinedEntries = []

    for (const portfolio of portfolios) {
      const { entries } = await portfolioController.getPortfolioEntries(portfolio._id)
      const entriesArray = Array.isArray(entries) ? entries : [entries]
      combinedEntries = combinedEntries.concat(entriesArray)
    }

    const skillIds = portfolios.reduce((acc, obj) => {
      return Array.from(new Set([...acc, ...obj.specification]))
    }, [])

    const { skills } = await skillController.getSkills(skillIds)

    const skillCounts = skills.reduce((acc, skill) => {
      const count = combinedEntries.filter(entry => entry.skill === skill.title).length
      acc[skill.title] = count
      return acc
    }, {})

    const sortedSkills = skills.sort((a, b) => {
      return skillCounts[b.title] - skillCounts[a.title]
    })

    return res.json({ portfolios, skills: sortedSkills, entries: combinedEntries })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

module.exports = router
