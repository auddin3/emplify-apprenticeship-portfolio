const { connectToDatabase, closeDatabase, getDb } = require('../scripts/database')
const bcrypt = require('bcryptjs')

async function seedUsers () {
  const usersData = [{
    email: 'a.a.uddin@se20.qmul.ac.uk',
    password: await bcrypt.hash('qmul', 12),
    name: 'Aysha Anita Uddin',
    school: 'Queen Mary\'s University of London',
  },
  {
    name: 'QMUL ',
    email: 'qmul@qmul.ac.uk',
    password: await bcrypt.hash('qmul', 12),
    school: 'Queen Mary\'s University of London',
  },
  {
    name: 'Test User',
    email: 'test.user@qmul.ac.uk',
    password: await bcrypt.hash('test', 12),
    school: 'University of Sheffield',
  }]

  const usersCollection = getDb().collection('users')
  const result = await usersCollection.insertMany(usersData)
  return result
}

async function addUsers () {
  try {
    await connectToDatabase()

    const db = getDb()
    await db.collection('users').deleteMany({})

    const seeded = await seedUsers()
    console.log('users seeded successfully:', seeded)
  } catch (error) {
    console.error('Error seeding users:', error)
  } finally {
    await closeDatabase()
  }
}

addUsers()
