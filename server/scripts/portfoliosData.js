const { connectToDatabase, closeDatabase, getDb } = require('../scripts/database')
const { ObjectId } = require('mongodb')

async function seedPortfolios () {
  const portfoliosData = [{
    name: 'BSC Accounting and Finance',
    performance: 0.65,
    owner: new ObjectId('65e346143c16c0c823b13fe5'),
    specification: [
      'C1',
      'C2',
      'C4',
      'C6',
      'C3',
      'C5',
      'C7',
    ],
    deadline: { $date: '2024-07-05T00:00:00.000Z' },
    description: '"Explore my BSC Accounting & Finance portfolio showcasing academic achievements, real-world experiences, and professional insights."',
    sharedWith: [
    ],
  },
  {
    name: 'MLA Law and Economics',
    performance: 0.45,
    owner: new ObjectId('65e7a14fee7f4fc12f41d736'),
    specification: [
      'C3',
      'C4',
      'C5',
      'C1',
      'C6',
      'C7',
    ],
    deadline: { $date: '2024-09-21T00:00:00.000Z' },
    description: '"MLA Law & Economics Portfolio: Academic achievements, real-world experiences, and professional insights showcased."',
    sharedWith: [
    ],
  }]

  const portfoliosCollection = getDb().collection('portfolios')
  const result = await portfoliosCollection.insertMany(portfoliosData)
  return result
}

async function addPortfolios () {
  try {
    await connectToDatabase()

    const db = getDb()
    await db.collection('portfolios').deleteMany({})

    const seeded = await seedPortfolios()
    console.log('portfolios seeded successfully:', seeded)
  } catch (error) {
    console.error('Error seeding portfolios:', error)
  } finally {
    await closeDatabase()
  }
}

addPortfolios()
