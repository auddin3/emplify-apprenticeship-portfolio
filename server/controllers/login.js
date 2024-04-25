// Import necessary modules
const { getDb } = require('../config/database')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const collectionName = 'users'

const authenticateUser = async (email, password) => {
  const db = await getDb()

  if (!db) {
    console.log('Could not connect to MongoDB server')
    return false
  }

  try {
    const user = await db.collection(collectionName).findOne({ email })

    if (!user || !password) return false

    const passwordsMatch = await bcrypt.compare(password, user.password)
    return passwordsMatch
  } catch (error) {
    console.log('Error with MongoDB server: ', error)
    throw new Error('Error authenticating user')
  }
}

// Login function
const login = async (req, res) => {
  const { email, password } = req.body

  // Authenticate user
  const isAuthenticated = await authenticateUser(email, password)
  if (!isAuthenticated) {
    return res.status(400).json({ message: 'Invalid email or password' })
  }

  try {
    const db = getDb()

    // Retrieve user data from database
    const user = await db.collection(collectionName).findOne({ email })

    // Generate JWT token
    const jwtToken = jwt.sign(
      { id: user._id },
      'my_secret_api_key',
      { expiresIn: '1 hour' },
    )

    // Send response with token and user data
    res.json({ message: 'Successful login', token: jwtToken, user })
  } catch (error) {
    console.log('Error with MongoDB server: ', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

// Function to get all users
const getAllUsers = async () => {
  try {
    const db = getDb()

    // Retrieve all users from database
    const users = await db.collection(collectionName).find().toArray()

    // Return users
    return { users }
  } catch (error) {
    console.log('Error with MongoDB server: ', error)
    throw new Error('Error retrieving users from database')
  }
}

// Export login and getAllUsers functions
module.exports = { login, getAllUsers, authenticateUser }
