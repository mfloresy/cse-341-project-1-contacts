const mongodb = require("../database/connect")
const objectId = require("mongodb").ObjectId

const getAll = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection("contacts").find();
    result.toArray().then((contacts)=>{
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(contacts)
    })
}


const getOne = async (req, res) => {
    const userId = new objectId(req.params.id)
    const result = await mongodb.getDatabase().db().collection("contacts").find({_id: userId});
    result.toArray().then((contacts)=>{
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(contacts[0])
    })
}


module.exports = {
    getAll,
    getOne
}