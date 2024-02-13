const { ObjectId } = require('mongodb');
const { getDb } = require('../config/config');

const collectionName = 'users';

const getAllUsers = async (req, res) => {
  try {
    const db = getDb();
    const users = await db.collection(collectionName).find().toArray();
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
    const user = await db.collection(collectionName).findOne({ _id: userId });

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

const createUser = async (req, res) => {
  try {
    const { name } = req.body;
    const db = getDb();
    const result = await db.collection(collectionName).insertOne({ name });

    const newUser = result.ops[0];
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = ObjectId(req.params.userId);
    const updatedName = req.body.name;

    const db = getDb();
    const result = await db.collection(collectionName).updateOne(
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
    const result = await db.collection(collectionName).deleteOne({ _id: userId });

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

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
