const express = require('express')
const router = express.Router()
const mongodb = require('mongodb')

const gradeController = require('../controllers/grade')

const ObjectId = mongodb.ObjectId

router.get('/grades/:uid', async function (req, res) {
  const uid = new ObjectId(req.params.uid)

  try {
    const { grades: userGrades } = await gradeController.getUserGrades(uid)
    return res.json({ userGrades })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }

  return res.json(uid)
})

module.exports = router
