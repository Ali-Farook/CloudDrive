const express = require('express');
const router = express.Router();
const user = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'aliis$boy';
const fetchUser = require('../middleware/fetchUser');
const { body, validationResult } = require('express-validator');
const login = require('../controllers/authentication');
const { findByIdAndUpdate } = require('../models/User');
// ROUTE 1: CREATE A SIGNUP FOR NEW USER

router.post('/signup', [
   body('email', 'Please enter valid Email').isEmail(),
   body('firstName', 'Please enter valid name of 2 characters long').isLength({ min: 2, max: 15 }),
   body('lastName', 'Please enter valid name of 2 characters long').isLength({ min: 2, max: 15 }),
   body('phoneNumber', 'Please enter valid name of 2 characters long').isLength({ min: 2, max: 15 }),
   body('password', 'Please enter valid password of 5 characters long').isLength({ min: 5, max: 20 })
], async (req, res) => {
   let success = false;
   let error = validationResult(req)
   if (!error.isEmpty()) {
      success = false
      return res.status(400).json({ error: error.array() })
   }
   try {
      // SEARCH A USER BY EMAIL AND PHONENUMBER
      let User = await user.findOne({ email: req.body.email, phoneNumber: req.body.phoneNumber })
      if (User) {
         success = false;
         return res.status(300).json({ error: "A user with this email already exiist" });
      }
      //USING HASH AND PEPPER TECHNIQUE BY USING PACKAGE 'bcrypt.js'
      let salt = await bcrypt.genSalt(6);
      let password = await bcrypt.hash(req.body.password, salt);
      success = true;
      // CREATE A USER
      User = await user.create({
         email: req.body.email,
         firstName: req.body.firstName,
         lastName: req.body.lastName,
         password: password,
         phoneNumber: req.body.phoneNumber
      });
      const data = {
         User: {
            id: User.id
         }
      };
      success = true;
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      return res.json({ success, authToken });
   } catch (error) {
      return res.status(500).json({ error: "internal server error" })
   }
});

//ROUTE 2: lOGGIN A USER | ------------------------------------------------------------------------

router.post('/login', [
   body('email').isEmail(),
   body('password').exists()
], async (req, res) => {
   let success = false;
   const error = validationResult(req);
   if (!error.isEmpty()) {
      success = false;
      return res.status(400).json({ success, error: error.array() });
   }
   const { email, password } = req.body;
   try {
      let User = await user.findOne({ email });
      if (!User) {
         success = false;
         return res.status(404).json({ success, error: "email issue" });
      }
      const passwordCompare = await bcrypt.compare(password, User.password);
      if (!passwordCompare) {
         success = false;
         return res.status(401).json({ success, error: 'pass issue' });
      }
      let data = {
         User: {
            id: User.id
         }
      }
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      return res.json({ success, authToken });
   } catch (error) {
      return res.status(500).json({ error: "internal server error" });
   }
});


//  ROUTE 2: MIDDLEWARE TO GET USER DETAILS |-------------------------------------------------------------

router.post('/getuser', fetchUser, async (req, res) => {
   try {
      let userID = req.User.id;
      const User = await user.findById(userID).select("-password")
      res.send(User);

   } catch (error) {
      return res.status(500).json({ error: "internal server error" });
   }
})

//ROUTE 3: FETCH THE USER  FOR PROFILE COMPONENT| ------------------------------------------------------------------------

router.get('/getThisUser', fetchUser, async (req, res) => {
   try {
      let userID = req.User.id;
      console.log(userID)
      const User = await user.findById(userID).select("-password");
      // console.log(User);
      res.send(User);

   } catch (error) {
      return res.status(500).json({ error: "internal server error" });
   }
})


//ROUTE 4: CHANGE THE PASSWORD

router.put('/changepassword', fetchUser, async (req, res) => {
   try {
      const { oldPassword, newPassword, conformPassword } = req.body;
      const userId = req.User.id;
     const User = await user.findById(userId);
      if (!User) {
         return res.status(500).json({ error: "User not found" });
      }
      const comparePassword = await bcrypt.compare(oldPassword, User.password);
      if (!comparePassword) {
         return res.status(401).json({ error: "Enter correct password" });
      }
      if (newPassword !== conformPassword) {
         return res.status(401).json({ error: "Enter correct password" });
      }
      // const salt = await bcrypt.genSalt(6);
      // const newHashPassword = await bcrypt.hash(conformPassword, salt);
      const newpassword = {password: conformPassword}
      User.password = await user.findOneAndUpdate(userId, newpassword, {new:true})
       return res.json(User);

   } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
   }
})

module.exports = router;