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

const getPortfolioCriterion = async (pid) => {
  const db = getDb()

  const { specification: titles } = await db.collection(collectionName).findOne(
    { _id: pid },
    { projection: { specification: 1, _id: 0 } },
  )

  const titleArray = Array.isArray(titles) ? titles : [titles]

  const specification = await db.collection('skills').find({ title: { $in: titleArray } }).toArray()

  return { specification }
}

module.exports = { getUserPortfolios, getPortfolioCriterion }
