const { getDb } = require('../config/database')
const bcrypt = require('bcrypt')

const collectionName = 'users'

const MIN_PASSWORD_LENGTH = 8

const isWeakPassword = (password) => {
  return password.length < MIN_PASSWORD_LENGTH || /^[a-z]+$/.test(password) || !/\d/.test(password)
}

const isValidEmail = (email) => {
  // Regular expression for email validation
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

const registerUser = async (name, email, password, school) => {
  const db = getDb()
  const collectionName = 'users'

  if (!isValidEmail(email)) {
    return { success: false, message: 'Invalid email format' }
  }

  const userAlreadyExists = await db.collection(collectionName).findOne({ email })
  if (userAlreadyExists) {
    return { success: false, message: 'Email already exists' }
  }

  if (isWeakPassword(password)) {
    return { success: false, message: 'Password is too weak' }
  }

  return { success: true, message: 'Successful registration' }
}

const register = async (req, res) => {
  const { name, email, password, school } = req.body

  const db = getDb()
  const validDetails = registerUser(name, email, password, school)

  if (!validDetails.success) {
    res.status(500).json({ error: 'Registration details are invalid' })
  }

  const hashedPassword = await bcrypt.hash(password, 12)
  const savedUser = db.collection(collectionName).insertOne({ name, email, password: hashedPassword, school }).catch((err) => {
    console.log('Error: ', err)
    res.status(500).json({ error: 'Failed to register user' })
  })

  if (savedUser) res.json({ message: 'Successful registration' })
}

module.exports = { register, registerUser }
