const User = require('./User')
const mongoose = require('mongoose')

const gradeSchema = new mongoose.Schema({
  module: { type: String, required: true },
  grades: [{
    activity: { type: String },
    grade: { type: Number },
  }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: User },
})

const Grade = mongoose.model('Grade', gradeSchema)

module.exports = Grade
