const { getDb } = require('../config/database')

const collectionName = 'grades'

const getUserGrades = async (uid) => {
  const db = getDb()

  const grades = await db.collection(collectionName).find({ user: uid }).toArray()

  return { grades }
}

const insertUserGrade = async (newEntry) => {
  const db = getDb()

  await db.collection(collectionName).insertOne(newEntry)
  const grades = await db.collection(collectionName).find({ user: newEntry.user }).toArray()
  return { grades }
}

module.exports = { getUserGrades, insertUserGrade }