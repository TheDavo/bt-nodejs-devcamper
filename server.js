const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

// Load environment variables
dotenv.config({
  path: './config/config.env'
});

// Load routes
const bootcamps = require('./routes/bootcamps');

const app = express();

// app.use(logger); <- fun exercise no longer will use

if (process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'));
}

// Mount routers
app.use('/api/v1/bootcamps', bootcamps);

const PORT = process.env.PORT || 5000;


app.listen(PORT, 
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);