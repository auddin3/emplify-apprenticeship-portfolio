const express = require('express')
const router = express.Router()
const mongodb = require('mongodb')
const { getDb } = require('../config/database')
const jwt = require('jsonwebtoken')

const registerController = require('../controllers/register')
const loginController = require('../controllers/login')

const ObjectId = mongodb.ObjectId

// Define user-related routes
router.post('/register', registerController.register)
router.post('/login', loginController.login)

router.post('/profile/:uid', async function (req, res) {
  const uid = new ObjectId(req.params.uid)
  const { name, email, school } = req.body

  const db = getDb()

  try {
    const updateOperation = await db.collection('users').updateOne({ _id: uid },
      { $set: { name, email, school } })

    const user = await db.collection('users').findOne({ _id: uid })

    const jwtToken = jwt.sign(
      { id: user._id },
      'my_secret_api_key',
      { expiresIn: '1 hour' },
    )

    return res.json({ updateOperation, token: jwtToken, user })
  } catch (e) {
    return res.error(e)
  }
})

module.exports = router
