const mongoose = require('mongoose');
require('dotenv').config()
const MONGO_URI = process.env.MONGO_URI;

exports.connect = () => {
	// Connecting to the database

	mongoose.set('strictQuery', false);
	mongoose
		.connect(MONGO_URI)
		.then(() => {
			console.log('Successfully connected to database');
		})
		.catch((error) => {
			console.log('Database connection failed. exiting now...');
			console.error(error);
			// eslint-disable-next-line no-process-exit
			process.exit(1);
		});
};

