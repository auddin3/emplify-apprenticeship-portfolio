const { connectToDatabase, closeDatabase, getDb } = require('../scripts/database')

async function seedSkills () {
  const skillData = [
    {
      title: 'D1',
      subTitle: 'Data Analytics',
      description: 'Is able to work with big data analytics solutions to derive insights and conclusions',
      category: ['dataModelling'],
    },
  ]

  const skillsCollection = getDb().collection('skills')
  const result = await skillsCollection.insertMany(skillData)
  return result
}

async function addSkills () {
  try {
    await connectToDatabase()

    // const db = getDb()
    // await db.collection('skills').deleteMany({})

    const seeded = await seedSkills()
    console.log('Skills seeded successfully:', seeded)
  } catch (error) {
    console.error('Error seeding Skills:', error)
  } finally {
    await closeDatabase()
  }
}

addSkills()
