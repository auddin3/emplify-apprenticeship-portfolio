const mongoose = require('mongoose')

const skillSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subTitle: { type: String, required: true },
  description: { type: String, required: true },
  category: [{ type: String }],
})

const Skill = mongoose.model('Skill', skillSchema)

module.exports = Skill
