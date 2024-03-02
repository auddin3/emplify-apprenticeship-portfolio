const { getDb } = require('../config/database')

const collectionName = 'modules'

const getAllModules = async () => {
  const db = getDb()

  const modules = await db.collection(collectionName).find().toArray()
  return { modules }
}

module.exports = { getAllModules }
