// to run server type npm start in console 
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require("dotenv/config");

//middleware for cors
//app.use(cors());
//codepen.io

//Import Routs 
const postsRoute = require('./routes/posts');
const userRoute = require('./routes/user');
const notificationsRoute = require('./routes/notifications');
//middleware for body parser
app.use(bodyParser.json());

//ROUTES
//Middlewares - runs for specific route
app.use('/posts',postsRoute);
app.use('/user',userRoute);
app.use('/notifications',notificationsRoute);

//HomePage
app.get('/',(req,res) => {
    res.send('We are on home');
});

//Connect to DB
mongoose.connect( process.env.DB_CONNECTION,{ useNewUrlParser: true, useUnifiedTopology: true  },() => {});

//listen to server
app.listen(3000);