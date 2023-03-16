const express = require("express");
const router = express.Router();
const { user } = require("./user_schema/user_schema");
const salt = 5;
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const code = "Kapil123"
router.post("/signup", async (req, res) => {
    bcrypt.genSalt(salt, (saltErr, saltValue) => {
        if (saltErr) {
            res.status(401).send("Unable to process")
        } else {
            bcrypt.hash(req.body.password, saltValue, (hashErr, hashValue) => {
                if (hashErr) {
                    res.status(401).send("Unable to process")
                } else {
                    user.create({
                        username: req.body.username, password: hashValue

                    }).then((user) => {
                        res.status(200).send(user)
                    }).catch((err) => {
                        res.send(400).send(err.message)
                    })
                }

            })
        }
    })
});

router.post("/signin", async (req, res) => {
    user.findOne({ username: req.body.username }).then((user) => {
        if (!user) {
            res.status(401).send("User not exist")
        } else {
            if (!bcrypt.compareSync(req.body.password, user.password)) {
                res.status(401).send("Invalid password")
            } else {
                const token = jwt.sign({ id: user._id, username: user.username }, code)
                res.status(200).send({ message: "User logged in successfully", token: token });

            }
        }
    }).catch(() => {

    })
})

module.exports = router;