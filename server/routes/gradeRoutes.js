const express = require('express')
const router = express.Router()
const mongodb = require('mongodb')

const gradeController = require('../controllers/grade')

const ObjectId = mongodb.ObjectId

router.get('/grades/:uid', async function (req, res) {
  try {
    const uid = new ObjectId(req.params.uid)
    const { grades: userGrades } = await gradeController.getUserGrades(uid)
    return res.json({ userGrades })
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

router.delete('/grades/:uid', async function (req, res) {
  try {
    const uid = new ObjectId(req.params.uid)
    const { module } = req.body
    const { grades: userGrades } = await gradeController.deleteGrade(uid, module)
    return res.json({ userGrades })
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

module.exports = router
