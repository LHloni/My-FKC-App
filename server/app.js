// to run server type npm start in console 
const express = require('express');
const app = express();
const mongoose = require('mongoose');
//const bodyParser = require('body-parser'); // this thing does not work anymore
const session = require('express-session')
const cors = require('cors');
// require("dotenv/config");
require("dotenv").config();

//middleware for cors
//app.use(cors());
//codepen.io

//Import Routs 
const postsRoute = require('./routes/posts');
const userRoute = require('./routes/user');
//const notificationsRoute = require('./routes/notifications');
const commentsRoute = require('./routes/comments');
const likesRoute = require('./routes/likes');
//const sessionRoute = require('./routes/session');

//middleware for body parser
//app.use(bodyParser.json()); //does not work anymore
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//middleware for express sessin
app.use(session({secret:process.env.SESSION_SECRET,resave:false,saveUninitialized:true}));

//ROUTES
//Middlewares - runs for specific route
app.use('/',postsRoute);
app.use('/posts',postsRoute);
app.use('/user',userRoute);
app.use('/comments',commentsRoute);
app.use('/likes',likesRoute);
//app.use('/session',sessionRoute);
//app.use('/notifications',notificationsRoute);

//HomePage
app.get('/',(req,res) => {
    res.send('We are on home');
});

//Connect to DB
mongoose.connect( process.env.DB_CONNECTION,{ useNewUrlParser: true, useUnifiedTopology: true  },() => {});

//listen to server
app.listen(3000);