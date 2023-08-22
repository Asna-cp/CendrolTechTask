const express = require('express');
// const controller = require('../Controller/userContrl')

// const controller = require('../Controller/userContrl');

const {registerController,allusers,deleteUsers,getUserById,updateUsers} = require('../Controller/userContrl')

//router 
const router = express.Router()

//REGISTER || POST
router.post('/register', registerController)
router.post('/deleteUser/:id', deleteUsers)
router.post('/updateUser/:id', updateUsers)


router.get('/alluser',allusers);
router.get('/getUser/:id',getUserById);


module.exports = router;