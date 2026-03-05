const express = require('express');
const { authenticateJWT } = require('../Middleware/authentication');
const {loginController, registerController, payController,getUserBills} = require('../controller/userController'); 

const userRouter = express.Router();

userRouter.post('/login', loginController);
userRouter.post('/register', registerController);
userRouter.put('/pay/:id', authenticateJWT,payController); 
userRouter.get('/getUserBills/:userMail',authenticateJWT,getUserBills);

module.exports = userRouter; 