const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

let database
let client

async function connect () {
  client = await MongoClient.connect('mongodb+srv://auddin:cTz8y4XH63WI7Spk@dev.p8a9z.mongodb.net/?retryWrites=true&w=majority')
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
