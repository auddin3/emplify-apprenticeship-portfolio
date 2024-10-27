const { connectToDatabase, closeDatabase, getDb } = require('../scripts/database')
const { ObjectId } = require('mongodb')

async function seedGrades () {
  const gradesData = [
    {
      module: 'UID102',
      grades: [
        {
          activity: 'Interactive Prototyping',
          grade: 0.4,
        },
        {
          activity: 'Accessibility Assessment',
          grade: 0.6,
        },
        {
          activity: 'Visual Design Evaluation',
          grade: 0.55,
        },
      ],
      user: new ObjectId('65e346143c16c0c823b13fe5'),
    },
    {
      module: 'WEB101',
      grades: [
        {
          activity: 'Responsive Design Implementation',
          grade: 0.4,
        },
        {
          activity: 'HTML/CSS Project',
          grade: 0.6,
        },
        {
          activity: 'JavaScript Fundamentals',
          grade: 0.55,
        },
      ],
      user: new ObjectId('65e346143c16c0c823b13fe5'),
    },
    {
      module: 'MOCK101',
      grades: [
        {
          activity: 'mockAssessment',
          grade: 0.004,
        },
      ],
      user: new ObjectId('65e346143c16c0c823b13fe5'),
    },
    {
      module: 'AIH101',
      grades: [
        {
          activity: 'Medical Image Analysis',
          grade: 0.74,
        },
        {
          activity: 'Predictive Analytics for Patient Care',
          grade: 0.89,
        },
        {
          activity: 'Ethical Considerations in AI for Healthcare',
          grade: 0.89,
        },
      ],
      user: new ObjectId('65e346143c16c0c823b13fe5'),
    },
    {
      module: 'IOTS101',
      grades: [
        {
          activity: 'Device Authentication Protocols',
          grade: 0.65,
        },
        {
          activity: 'Data Encryption in IoT',
          grade: 0.78,
        },
        {
          activity: 'Security Best Practices for IoT Devices',
          grade: 0.69,
        },
      ],
      user: new ObjectId('65e346143c16c0c823b13fe5'),
    },
    {
      module: 'BCT101',
      grades: [
        {
          activity: 'Smart Contract Development',
          grade: 0.69,
        },
        {
          activity: 'Decentralized Applications',
          grade: 0.67,
        },
        {
          activity: 'Blockchain Security Measures',
          grade: 0.72,
        },
      ],
      user: new ObjectId('65e346143c16c0c823b13fe5'),
    },
    {
      module: 'CS101',
      grades: [
        {
          activity: 'Identity and Access Management',
          grade: 0.67,
        },
        {
          activity: 'Data Encryption in Cloud Environments',
          grade: 0.8,
        },
        {
          activity: 'Incident Response in Cloud Security',
          grade: 0.43,
        },
      ],
      user: new ObjectId('65e7a14fee7f4fc12f41d736'),
    },
    {
      module: 'AIH101',
      grades: [
        {
          activity: 'Medical Image Analysis',
          grade: 0.67,
        },
        {
          activity: 'Predictive Analytics for Patient Care',
          grade: 0.56,
        },
        {
          activity: 'Ethical Considerations in AI for Healthcare',
          grade: 0.8,
        },
      ],
      user: new ObjectId('65e7a14fee7f4fc12f41d736'),
    },
    {
      module: 'AIH101',
      grades: [],
      user: new ObjectId('65e346143c16c0c823b13fe5'),
    },
    {
      module: 'BDA101',
      grades: [
        {
          activity: 'Data Processing Techniques',
          grade: 0.7,
        },
        {
          activity: 'Hadoop Framework Usage',
          grade: 0.7,
        },
        {
          activity: 'Predictive Modeling with Big Data',
          grade: 0.7,
        },
      ],
      user: new ObjectId('65e346143c16c0c823b13fe5'),
    },
    {
      module: 'BDA101',
      grades: [],
      user: new ObjectId('65e346143c16c0c823b13fe5'),
    },
    {
      module: 'BDA101',
      grades: [],
      user: new ObjectId('65e346143c16c0c823b13fe5'),
    },
  ]

  const gradesCollection = getDb().collection('grades')
  const result = await gradesCollection.insertMany(gradesData)
  return result
}

async function addGrades () {
  try {
    await connectToDatabase()

    const db = getDb()
    await db.collection('grades').deleteMany({})

    const seeded = await seedGrades()
    console.log('grades seeded successfully:', seeded)
  } catch (error) {
    console.error('Error seeding grades:', error)
  } finally {
    await closeDatabase()
  }
}

addGrades()
