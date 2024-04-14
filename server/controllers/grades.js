const { getDb } = require('../config/database')

const collectionName = 'grades'

const getUserGrades = async (uid) => {
  const db = getDb()

  const grades = await db.collection(collectionName).find({ user: uid }).toArray()

  return { grades }
}

module.exports = { getUserGrades }
