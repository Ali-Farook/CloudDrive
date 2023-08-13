const express = require('express');
const router = express.Router();
const image = require("../models/image");
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'aliis$boy';
const fetchUser = require('../middleware/fetchUser');
const { body, validationResult } = require('express-validator');

router.post("/images", fetchUser, async (req, res) => {
    let error = validationResult(req);
    if (!error.isEmpty()) {
        return res.sendStatus(500).json({ error: "Internal server error" });
    }
    try {
        const { img, title } = req.body;
        const Image = new image({ title, img, User: req.User.id });
        Image.save();
        return res.json(Image).sendStatus(200);
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
        let Images = await image.find(User);
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
        let Images = image.findById(Id);
        if(!Images){
            return res.sendStatus(404);
        }
        Images = await image.findByIdAndDelete(Id);
        return res.sendStatus(200).json(Images);
    } catch (error) {
        return res.sendStatus(500).json(error)
    }
});

module.exports = router;
