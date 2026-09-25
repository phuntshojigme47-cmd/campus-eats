const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

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