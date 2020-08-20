const express = require("express");
const User = require("../model/users.model");

const router = express.Router();

router.route("/register").post((req,res) => {
    console.log("Inside the register");
    const user = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
    });
    user.save().then(() => {
        console.log("User Registered");
        res.status(200).json("OK");
    }).catch((error) => {
        res.status(403).json({ msg: error });
    });
});

module.exports = router;
