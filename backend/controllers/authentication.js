const express = require('express');
const user = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'aliis$boy';
const fetchUser = require('../middleware/fetchUser');
const { body, validationResult } = require('express-validator');

const login =  async (req, res) => {
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
 }

 module.exports = {login}