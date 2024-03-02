const { getDb } = require('../config/database')

const collectionName = 'portfolios'

const getUserPortfolios = async (uid) => {
  const db = getDb()

  const portfolios = await db.collection(collectionName).find({
    $or: [
      { owner: uid },
      { sharedWith: { $in: [uid] } },
    ],
  }).toArray()

  return { portfolios }
}

module.exports = { getUserPortfolios }
