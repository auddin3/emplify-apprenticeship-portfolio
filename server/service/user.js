const { ObjectId } = require('mongodb');
const { getDb } = require('../config/config');
const bcrypt = require('bcryptjs')

const createUser = async (req, res) => {
  try {
    const { email: enteredEmail, password: enteredPassword, name: enteredName } = req.body;
    const db = getDb();
    
    const hashedPassword = await bcrypt.hash(enteredPassword, 12)
    
    const user = {
      email: enteredEmail, 
      password: hashedPassword, 
      name: enteredName,
    }
    
    const result = await db.collection('users').insertOne(user);
    res.status(201).json({ message: 'Success' });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
  };

const loginUser = async (req, res) => {
  const { email: enteredEmail, password: enteredPassword } = req.body

  try {
    const db = getDb();
    const existingUser = await db.collection('users').findOne({ email: enteredEmail })

    if (!existingUser) {
      return res.status(500).json({ message: 'User does not exist'})
    } 

    const passwordsAreEqual = await bcrypt.compare(enteredPassword, existingUser.password)

    if (!passwordsAreEqual) {
      return res.status(500).json({ message: 'Could not login - incorrect password'})
    } 

    req.session.user = { id: existingUser._id, email: existingUser.email }
    req.session.isAuthenticated = true
    req.session.save()

    res.status(201).json({ message: 'Success' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
  }

const updateUser = async (req, res) => {
  try {
    const userId = ObjectId(req.params.userId);
    const updatedName = req.body.name;
    
    const db = getDb();
    const result = await db.collection('users').updateOne(
      { _id: userId },
      { $set: { name: updatedName } }
      );
      
      if (result.modifiedCount === 1) {
        res.json({ message: 'User updated successfully' });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  const deleteUser = async (req, res) => {
    try {
      const userId = ObjectId(req.params.userId);
      
      const db = getDb();
      const result = await db.collection('users').deleteOne({ _id: userId });
      
      if (result.deletedCount === 1) {
        res.json({ message: 'User deleted successfully' });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  const getAllUsers = async (req, res) => {
    try {
      const db = getDb();
      const users = await db.collection('users').find().toArray();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  const getUserById = async (req, res) => {
    try {
      const userId = ObjectId(req.params.userId);
      const db = getDb();
      const user = await db.collection('users').findOne({ _id: userId });
  
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

module.exports = {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  getAllUsers,
  getUserById,
};
