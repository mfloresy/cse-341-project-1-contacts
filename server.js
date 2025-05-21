const express = require("express")
const app = express()
const mongodb = require("./database/connect");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;

app.use("/", require("./routes"))
app.use(bodyParser.json())

mongodb.connect((err) =>{
    if(err){
        console.log(err)
    }else{
        app.listen(port, ()=>{console.log(`Running on port ${port}`)})
    }
})


