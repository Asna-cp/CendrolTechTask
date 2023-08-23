require('dotenv/config');
const express = require("express");
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('./Configuration/connection')
const userRoute = require('./Routes/userRoutes');
const morgan = require('morgan')
const path = require('path');

const api = process.env.API_URL;

//view engin setup
app.set('view engine','ejs');
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended:true}))


//middleware
app.use(bodyParser.json());
app.use(morgan('tiny'))



// USER ROUTE
app.use("/", userRoute);




app.listen(5000, () => {
    console.log("server is running on port 5000");
})