const express = require('express')
const router = express.Router()
const mongodb = require('mongodb')
const { getDb } = require('../config/database')

const registerController = require('../controllers/register')
const loginController = require('../controllers/login')

const ObjectId = mongodb.ObjectId

// Define user-related routes
router.post('/register', registerController.register)
router.post('/login', loginController.login)

router.post('/profile/:uid', async function (req, res) {
  const uid = new ObjectId(req.params.uid)
  const { name } = req.body

  const db = getDb()

  try {
    const updatedUser = await db.collection('users').updateOne({ _id: uid },
      { $set: { name } })
    return res.json(updatedUser)
  } catch (e) {
    return res.error(e)
  }
})

module.exports = router
