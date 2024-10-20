const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

let database
let client

async function connect () {
  client = await MongoClient.connect('mongodb://127.0.0.1:27017')
  database = client.db('emplify')
}

function getDb () {
  if (!database) {
    // eslint-disable-next-line no-throw-literal
    throw { message: 'Database connection not established!' }
  }
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
