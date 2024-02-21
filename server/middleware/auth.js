const jwt = require('jsonwebtoken');
const { getDb } = require('../config/config');
require('dotenv').config();

const mongodb = require('mongodb')
const ObjectId = mongodb.ObjectId

const SECRET_KEY = 'a-secret-key'


const authenticate = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
        return res.status(401).json({ message: 'Authentication required' });
    }
    
    try {
      const decodedToken = jwt.verify(token, SECRET_KEY)

      const db = await getDb()
      const user = await db.collection('users').findOne({ email: decodedToken.userId });
      
      if (!user) {
        return res.status(404).json({ message: 'User not found', id: decodedToken.userId });
      }
  
      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Invalid token' });
    }
  };
  
  module.exports = { authenticate };