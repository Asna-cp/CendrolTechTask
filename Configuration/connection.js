const mongoose = require('mongoose')

// Database connection 
const db = "mongodb://127.0.0.1:27017/cendrolTech'"
// await mongoose.connect(', connectionParams);


mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
   
}) 

// connection checking
mongoose.connection
.once('open', () =>console.log('database connected '))
.on('error', error => console.log('error:', error))