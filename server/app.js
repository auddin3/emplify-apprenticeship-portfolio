const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const db = require("./config/database")
const app = express()

// Middleware
app.use(cors())
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))

// Routes
const userRoutes = require("./routes/userRoutes")
app.use(userRoutes)

app.use(function(error, req, res) {
	res.render("500")
})

// Start the server
db.connectToDatabase().then(function() {
	app.listen(5001)
})
