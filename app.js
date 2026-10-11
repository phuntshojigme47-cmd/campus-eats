const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const session = require('express-session');

dotenv.config();
const { connectMongo } = require('./config/mongo');

connectMongo().catch((err) => {
  console.error('MongoDB connection failed:', err);
});

const app = express();
const PORT = process.env.PORT || 3000;

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Read data submitted through HTML forms
app.use(express.urlencoded({ extended: true }));

// Read JSON data submitted through the API
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'campus-eats-dev-secret',
  resave: false,
  saveUninitialized: false
}));

app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

// Import routes
const indexRoutes = require('./routes/index');
const apiRoutes = require('./routes/api');

// Connect routes to the application
app.use('/', indexRoutes);
app.use('/api', apiRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Campus Eats running at http://localhost:${PORT}`);
});