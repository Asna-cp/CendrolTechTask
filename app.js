require('dotenv/config');
const express = require("express");
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('./Configuration/connection')
const userRoute = require('./Routes/userRoutes');
const multer = require('multer')
const morgan = require('morgan')
const path = require('path');


//Multer (file upload)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images/");
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extension = path.extname(file.originalname);
        cb(null, 'image-' + uniqueSuffix + extension);
      },
    });
    
    const upload = multer({ storage });

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



// app.get(`${api}/products`, (req,res) => {
//     const product = {
//         id:1,
//         name:"hair",
//         image:'some_url'
//     }
//     res.send(product);
// })

// app.post(`${api}/products`, (req,res) => {
//     const newProduct = req.body;
//     console.log(newProduct);
//     res.send(newProduct)
   
// })

app.listen(5000, () => {
    console.log("server is running on port 5000");
})