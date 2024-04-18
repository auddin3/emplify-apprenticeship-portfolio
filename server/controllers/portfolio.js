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

const updatePortfolio = async (pid, updatedPortfolioData) => {
  const db = getDb()

  try {
    if (!updatedPortfolioData) {
      throw new Error('No update object.')
    }

    const existingPortfolio = await db.collection(collectionName).findOne({ _id: pid })

    const result = await db.collection(collectionName).updateOne(
      { _id: pid },
      {
        $set: {
          name: updatedPortfolioData?.name,
          description: updatedPortfolioData?.description,
          specification: updatedPortfolioData?.specification,
        },
      },
    )

    if (result.modifiedCount === 0) {
      throw new Error('Portfolio not found or not updated.')
    }

    const updatedPortfolio = await db.collection(collectionName).findOne({ _id: pid })
    // const deletedSkills = existingPortfolio?.specification?.filter(skill => !updatedPortfolio?.specification?.includes(skill))

    console.log(existingPortfolio, updatedPortfolioData)

    // await db.collection('portfolioEntries').deleteMany({
    //   portfolio: pid,
    //   skill: { $in: deletedSkills },
    // })

    return updatedPortfolio
  } catch (error) {
    throw new Error(`Failed to update portfolio: ${error.message}`)
  }
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

const insertPortfolioEntry = async (newEntry) => {
  const db = getDb()
  await db.collection('portfolioEntries').insertOne(newEntry)

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
  updatePortfolio,
  getPortfolioCriterion,
  getPortfolioEntries,
  getEntries,
  insertPortfolioEntry,
  updatePortfolioEntry,
  deletePortfolioEntry,
}
