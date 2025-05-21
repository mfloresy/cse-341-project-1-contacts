const router = require('express').Router()

router.get("/", (req, res) => {
    res.send("Main page")
})

router.use("/contacts", require("./contacts"))

module.exports = router;