const router = require('express').Router()

router.use("/", require("./swagger"))

router.get("/", (req, res) => {
    //#swagger.tags=['Main Page']
    res.send("Main page")
})

router.use("/contacts", require("./contacts"))

module.exports = router;