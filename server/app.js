const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./scripts/database')
const app = express()

// Middleware
app.use(cors())
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

// Routes
const indexRoutes = require('./routes/index')
const authRoutes = require('./routes/authRoutes')
const portfolioRoutes = require('./routes/portfolioRoutes')
const moduleRoutes = require('./routes/moduleRoutes')
const gradeRoutes = require('./routes/gradeRoutes')
const skillRoutes = require('./routes/skillRoutes')

app.use('/', indexRoutes)
app.use(authRoutes)
app.use(portfolioRoutes)
app.use(moduleRoutes)
app.use(gradeRoutes)
app.use(skillRoutes)

// Start the server
db.connectToDatabase().then(function () {
  app.listen(5001)
})
