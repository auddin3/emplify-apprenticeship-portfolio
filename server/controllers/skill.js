const { getDb } = require('../config/database')

const collectionName = 'skills'

const getSkills = async (skillIds) => {
  const db = getDb()

  const skills = await db.collection(collectionName).find({ title: { $in: skillIds } }).toArray()
  return { skills }
}

module.exports = { getSkills }
