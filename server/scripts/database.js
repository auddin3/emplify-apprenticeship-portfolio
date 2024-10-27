const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

let database
let client

async function connect () {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017'
  client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  database = client.db('emplify')
}

function getDb () {
  if (!database) throw new Error('Database connection not established!')
  return database
}

async function close () {
  if (client) {
    await client.close()
    database = null
    client = null
  }
}

module.exports = {
  connectToDatabase: connect,
  getDb,
  closeDatabase: close,
}
