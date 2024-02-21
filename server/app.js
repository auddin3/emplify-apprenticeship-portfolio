const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./config/config')
const app = express();
const PORT = 5001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
const session = require('express-session')
const mongodbStore = require('connect-mongodb-session')

const mongoDBStore = mongodbStore(session)

const sessionStore = new mongoDBStore({
    uri: 'mongodb://localhost:27017',
    databaseName: 'emplify',
    collection: 'sessions'
})

app.use(session({
    secret: 'super-secret',
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: ({
      maxAge: 2 * 60 * 60 * 1000
    })
  }))

// Routes
const indexRoutes = require('./routes/index');
const userRoutes = require('./routes/userRoutes');

app.use(indexRoutes);
app.use(userRoutes);

app.use(function(error, req, res, next) {
    res.render('500');
})

// Start the server
db.connectToDatabase().then(function() {
    app.listen(PORT);
})
