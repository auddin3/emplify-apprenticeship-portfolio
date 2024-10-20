const User = require('./User')
const mongoose = require('mongoose')

const portfolioSchema = new mongoose.Schema({
  name: { type: String, required: true },
  performance: { type: Number },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: User },
  specification: [{ type: String, required: true }],
  deadline: { type: Date, required: true },
  description: { type: String, required: true },
  sharedWith: [{ type: mongoose.Schema.Types.ObjectId, ref: User }],
})

const Portfolio = mongoose.model('Portfolio', portfolioSchema)

module.exports = Portfolio
