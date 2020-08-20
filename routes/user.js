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

router.route("/update/:username").patch((req,res) => {
    User.findOneAndUpdate(
        { username: req.params.username },
        { $set: { password: req.body.password } },
        (error, result) => {
            if (error) return res.status(500).json({ msg: error });
            const msg = {
                msg: "password successfully updated",
                username: req.params.username,
            };
            return res.json(msg);
        }
    );
});

router.route("/delete/:username").delete((req, res) => {
    User.findOneAndDelete(
        {username: req.params.username},
        (error, result) => {
            if (error) return res.status(500).json({msg: error});
            const msg = {
                msg: "Username Deleted",
                username: req.params.username,
            };
            return res.json(msg);
        }
    );
});

module.exports = router;
