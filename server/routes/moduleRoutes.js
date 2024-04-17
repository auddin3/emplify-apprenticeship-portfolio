const express = require('express')
const router = express.Router()

const moduleController = require('../controllers/module')

// Define main route
router.get('/', (req, res) => {
  res.send('Welcome to the API!')
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
