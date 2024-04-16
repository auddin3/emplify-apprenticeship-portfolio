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

const getPortfolioEntries = async (pid) => {
  const db = getDb()

  const entries = await db.collection('portfolioEntries').find({ portfolio: pid }).toArray()
  return { entries }
}

const getEntries = async () => {
  const db = getDb()

  const entries = await db.collection('portfolioEntries').find({}).toArray()
  return { entries }
}

const updatePortfolioEntry = async (pid, formattedEntry) => {
  const db = getDb()
  await db.collection('portfolioEntries').updateOne(
    { _id: pid },
    {
      $set: {
        q1: formattedEntry.q1,
        q2: formattedEntry.q2,
        q3: formattedEntry.q3,
        q4: formattedEntry.q4,
      },
    })

  const entries = await db.collection('portfolioEntries').find({}).toArray()
  return { entries }
}

const deletePortfolioEntry = async (pid) => {
  const db = getDb()
  await db.collection('portfolioEntries').deleteOne({ _id: pid })

  const entries = await db.collection('portfolioEntries').find({}).toArray()
  return { entries }
}

module.exports = {
  getUserPortfolios,
  getPortfolioCriterion,
  getPortfolioEntries,
  getEntries,
  updatePortfolioEntry,
  deletePortfolioEntry,
}
