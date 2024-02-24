const { getDb } = require('../config/database');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const collectionName = 'users';

const login = async (req, res) => {
    const { email, password } = req.body;

    const db = getDb()
    
    const user = await db.collection(collectionName).findOne({ email: email }).catch(
        (err) => {
          console.log("Error with MongoDB server: ", err);
        }
      )    
    
    if (!user) {
        return res.status(400).json({ message: "Email does not exist" });
    }

    const passwordsAreEqual = await bcrypt.compare(password, user.password).catch(
        (err) => {
          console.log("Error with bcrypt operation: ", err);
        }
      )    
	
    if (!passwordsAreEqual) {
        return res.status(500).json({ message: "Incorrect password"})
    }

    const jwtToken = jwt.sign(
        { id: user._id, email: user.email },
        'my_secret_api_key',
        {
			expiresIn: "1 hour"
		}
      );
    
    res.json({ message: "Successful login", token: jwtToken, user: user });

}

module.exports = {
    login,
  };