const express = require('express')
const router = express.Router()

const skillController = require('../controllers/skill')

router.get('/skills', async function (req, res) {
  try {
    const { skills } = await skillController.getSkills()

    return res.json({ skills })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

module.exports = router
