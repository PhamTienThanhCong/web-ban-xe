const mongoose = require('mongoose');
const config = require('../config/index');
const connection = mongoose.connect(`${config.database.uri}/${config.database.database_name}`);

connection
  .then((db) => {
    console.log('Connected to MongoDB server');
    return db;
  }, (err) => {
    if(err.message.code === 'ETIMEDOUT'){
      console.log('Attempting to re-establish database connection.');
			mongoose.connect(config.database.uri);
    } else {
      console.log('Error while attempting to connect to database:');
			logger.error(err);
		}
  })

module.exports = connection;
