const express = require('express');
const router = express.Router();
const Image = require("../models/image");
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'aliis$boy';
const fetchUser = require('../middleware/fetchUser');
const { body, validationResult } = require('express-validator');

router.post("/createImage", fetchUser, async (req, res) => {
    let error = validationResult(req);
    if (!error.isEmpty()) {
        return res.sendStatus(500).json({ error: "Internal server error" });
    }
    try {
        const { image } = req.body;
        const Imagee = new Image({  image, User: req.User.id });
        console.log(Imagee);
        Imagee.save();
        return res.json(Imagee).sendStatus(200);
    } catch (error) {
        return res.sendStatus(500).json({ error: "Internal server error" });
    }
});

router.get("/getAllImages", fetchUser, async (req, res) => {
    let error = validationResult(req);
    if (!error.isEmpty()) {
        return res.sendStatus(500).json({ error: "Internal server error" });
    }
    try {
        let User = req.User.id;
        let Images = await Image.find(User);
        return res.sendStatus(200).json(Images);

    } catch (error) {
        return res.sendStatus(500).json(error)
    }
});

router.delete("/deleteImage/:Id", fetchUser, async (req, res) => {
    let error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(500).json({ error: "Internal server error" });
    }
    try {
        let Id = req.params.Id;
        let Images = Image.findById(Id);
        if(!Images){
            return res.sendStatus(404);
        }
        Images = await Image.findByIdAndDelete(Id);
        return res.sendStatus(200).json(Images);
    } catch (error) {
        return res.sendStatus(500).json(error)
    }
});

module.exports = router;
