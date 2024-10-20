const { getDb } = require('../scripts/database')

const collectionName = 'skills'

const getSkills = async () => {
  const db = getDb()

  const skills = await db.collection(collectionName).find({ }).toArray()
  return { skills }
}

const getPortfolioSkills = async (skillIds) => {
  const db = getDb()

  const skills = await db.collection(collectionName).find({ title: { $in: skillIds } }).toArray()
  return { skills }
}

module.exports = { getSkills, getPortfolioSkills }
