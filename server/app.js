const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const db = require("./config/config")
const app = express()
const PORT = 5001

// Middleware
app.use(cors())
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))

// Routes
const indexRoutes = require("./routes/index")
const userRoutes = require("./routes/userRoutes")

app.use("/", indexRoutes)
app.use("/users", userRoutes)

// Start the server
db.connectToDatabase().then(function() {
	app.listen(PORT)
})
