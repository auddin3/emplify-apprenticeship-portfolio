const { getDb } = require('../config/database')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const collectionName = 'users'

const authenticateUser = async (email, password) => {
  const db = await getDb()

  if (!db) return false

  try {
    if (!email || typeof email !== 'string' || !password || typeof password !== 'string') return false

    const user = await db.collection(collectionName).findOne({ email })

    if (!user) return false

    const passwordsMatch = await bcrypt.compare(password, user.password)
    return passwordsMatch
  } catch (error) {
    console.log('Error with MongoDB server: ', error)
    throw new Error('Error authenticating user')
  }
}

const login = async (req, res) => {
  const { email, password } = req.body

  const isAuthenticated = await authenticateUser(email, password)
  if (!isAuthenticated) {
    return res.status(400).json({ message: 'Invalid email or password' })
  }

  try {
    const db = getDb()
    const user = await db.collection(collectionName).findOne({ email })

    const jwtToken = jwt.sign(
      { id: user._id },
      'my_secret_api_key',
      { expiresIn: '1 hour' },
    )

    res.json({ message: 'Successful login', token: jwtToken, user })
  } catch (error) {
    console.log('Error with MongoDB server: ', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

const getAllUsers = async () => {
  try {
    const db = getDb()
    const users = await db.collection(collectionName).find().toArray()
    return { users }
  } catch (error) {
    console.log('Error with MongoDB server: ', error)
    throw new Error('Error retrieving users from database')
  }
}

module.exports = { login, getAllUsers, authenticateUser }
