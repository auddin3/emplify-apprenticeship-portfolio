const Portfolio = require('./Portfolio')
const mongoose = require('mongoose')

const portfolioEntrySchema = new mongoose.Schema({
  portfolio: { type: mongoose.Schema.Types.ObjectId, ref: Portfolio },
  skill: { type: String, required: true },
  module: { type: String, required: true },
  dateCreated: { type: Date, default: Date.now },
  q1: { type: String },
  q2: { type: String },
  q3: { type: String },
  q4: { type: String },
})

const PortfolioEntry = mongoose.model('PortfolioEntry', portfolioEntrySchema)

module.exports = PortfolioEntry
