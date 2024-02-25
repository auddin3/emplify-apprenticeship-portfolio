const { getDb } = require('../config/database')

const collectionName = 'portfolios'

const getUserPortfolios = async (uid) => {
  const db = getDb()

  const portfolios = await db.collection(collectionName).find({ owner: uid }).toArray()
  return { portfolios }
}

module.exports = { getUserPortfolios }