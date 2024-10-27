const { getDb } = require('../scripts/database')
const bcrypt = require('bcryptjs')

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
  const validDetails = await registerUser(name, email, password, school)

  if (!validDetails.success) {
    return res.status(500).json({ error: validDetails.message })
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 12)
    await db.collection(collectionName).insertOne({ name, email, password: hashedPassword, school })
    res.json({ message: 'Successful registration' })
  } catch (err) {
    console.log('Error: ', err)
    res.status(500).json({ error: 'Failed to register user' })
  }
}

module.exports = { register, registerUser }
