const mongoose = require('mongoose')

const moduleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  moduleId: { type: String, required: true },
  category: { type: String, required: true },
  assessmentBreakdown: [{
    title: { type: String },
    percentage: { type: Number },
  }],
  description: { type: String },
  learningObjectives: [{ type: String }],
  dateCreated: { type: Date, default: Date.now },
})

const Module = mongoose.model('Module', moduleSchema)

module.exports = Module
