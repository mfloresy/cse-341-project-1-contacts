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

const createContact = async (req, res) => {
    const contact = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday
    }
    const result = await mongodb.getDatabase().db().collection("contacts").insertOne(contact);
    if (result.acknowledged){
        res.status(204).send();
    }else{
        res.status(500).json(result.error || 'Error saving contact to Database.');
    }
}

const putContact = async (req, res) => {
    const contact = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday
    }
    const result = await mongodb.getDatabase().db().collection("contacts").replaceOne({_id: new objectId(req.params.id)}, contact);
    if (result.modifiedCount > 0){
        res.status(204).send();
    }else{
        res.status(500).json(result.error || 'Error saving contact to Database.');
    }
}

const deleteContact = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection("contacts").deleteOne({_id: new objectId(req.params.id)}, true);
    if (result.modifiedCount > 0){
        res.status(204).send();
    }else{
        res.status(500).json(result.error || 'Error saving contact to Database.');
    }
}

module.exports = {
    getAll,
    getOne,
    createContact,
    putContact,
    deleteContact
}