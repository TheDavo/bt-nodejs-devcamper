// This file is used to pull in bootcamps data and 'seed' the database without manually inputting bootcamps

const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// Load env
dotenv.config({ path: './config/config.env' });

// Load models
const Bootcamp = require('./models/Bootcamp');

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Read JSON files
const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8')
);

// Import into DB
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);

    console.log('Data Imported...'.green.inverse);
    process.exit();
  } catch (err) {
    console.error(err.red);
  }
};

// Delete the data
const deleteData = async () => {
  try {
    await Bootcamp.deleteMany();

    console.log('Data Destroyed...'.yellow.inverse);
    process.exit();
  } catch (err) {
    console.error(err.red);
  }
};

if (process.argv[2] === '-import') {
  importData();
} else if (process.argv[2] === '-delete') {
  deleteData();
}
