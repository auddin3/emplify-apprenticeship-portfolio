const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

let database

async function connect () {
  const client = await MongoClient.connect('mongodb://127.0.0.1:27017')
  database = client.db('emplify')
}

function getDb () {
  if (!database) {
    // eslint-disable-next-line no-throw-literal
    throw { message: 'Database connection not established!' }
  }
  return database
}

module.exports = {
  connectToDatabase: connect,
  getDb,
}
