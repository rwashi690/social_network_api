//Import in the required packages
require('dotenv').config();
const express = require('express');
const application = express();
const mongoose = require('mongoose');

//Connect to the database
//The name of Rach, Rosie and Ryder's social media-Rgram
mongoose.connect(process.env.DB_URL, {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', (error)=> console.error(error));
db.once('open', () => console.log('connected to Rgram database'));

//set up middleware
application.use(express.json());

//set up routes
const userRoutes = require('./routes/users');
const thoughtRoutes = require('./routes/thoughts');
application.use('/users', userRoutes);
application.use('/thoughts', thoughtRoutes);


//Start server locally
const PORT = 3001;
application.listen(PORT, ()=> console.log(`server started for Rgram on ${PORT}`));