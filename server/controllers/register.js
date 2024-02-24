const { getDb } = require('../config/database');
const bcrypt = require("bcrypt");

const collectionName = 'users';

const register = async (req, res) => {
  const { email, password, name } = req.body

  const db = getDb()

  const alreadyExistsUser = await db.collection(collectionName).findOne({ email: email }).catch(
    (err) => {
      console.log("Error with MongoDB server: ", err);
    }
  )

  if (alreadyExistsUser) {
    return res.status(409).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 12)
  const savedUser = db.collection(collectionName).insertOne({ name: name, email: email, password: hashedPassword }).catch((err) => {
    console.log("Error: ", err);
    res.status(500).json({ error: "Failed to register user" });
  });

  if (savedUser) res.json({ message: "Successful registration" });
};

module.exports = {
  register,
};