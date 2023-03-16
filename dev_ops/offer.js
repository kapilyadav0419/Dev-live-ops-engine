const express = require("express");
const router = express.Router();
const { offer } = require("./user_schema/offer_schema");
const jwt = require("jsonwebtoken")
const code = "Kapil123"
const getuserbtytoken = (token) => {
    return new Promise((res, rej) => {
        if (token) {
            let userData
            try {
                userData = jwt.verify(token, code);
                res(userData)
            } catch (err) {
                rej("invalid token")
            }
        } else {
            rej("invalid token")
        }
    })
}
router.get("/list", async (req, res) => {
    const validOffers = [] ;
    offer.find().then((offers) => {
        offers.filter((offer) => {
            const rules = offer.target.split("and");
            rules.forEach((rule) => {
                let ruleKey
                if (rule.includes(">")) {
                  ruleKey = {key :rule.trim().split(">")[0].trim() , value :parseInt(rule.trim().split(">")[1])}
                  if(req.body[ruleKey.key]>ruleKey.value){
                    validOffers.push(offer)
                  }
                } else {
                  ruleKey = {key :rule.trim().split("<")[0].trim() , value :parseInt(rule.trim().split("<")[1]) }
                  if(req.body[ruleKey.key]<ruleKey.value){
                    validOffers.push(offer)
                  }
                }
            })
            res.status(200).send(validOffers)
        }) 
    }).catch((err) => {
        res.status(500).send("Internal server error")
    })
})
router.post("/create", async (req, res) => {
    getuserbtytoken(req.headers.authorization).then((user) => {
        offer.create({ ...req.body, username: user.username }).then((offer) => {
            res.status(200).send(offer);
        }).catch((err) => {
            res.status(401).send({ message: err.message })
        })
    }).catch((err) => {
        res.status(401).send(err)
    })
});
router.put("/update", async (req, res) => {
    offer.updateOne({ _id: req.params.id }, req.body)
});
router.delete("/delete", async (req, res) => {
    offer.deleteOne({ _id: req.body.id })
})

module.exports = router;