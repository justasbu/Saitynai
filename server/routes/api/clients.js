const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//Get client
router.get('/:id',async (req,res) => {
    const clients = await loadClientsCollection();
    var ObjectId = require('mongodb').ObjectID
    res.send(await clients.findOne({_id : ObjectId(req.params.id)}));
});
//Get clients
router.get('/',async (req,res) => {
    const clients = await loadClientsCollection();
    res.send(await clients.find({}).toArray());
});
//Add client
router.post('/', async (req,res) =>{
    const clients = await loadClientsCollection();
    await clients.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });
    res.status(201).send();
})

//Delete client
router.delete('/:id', async (req,res) =>{
    const clients = await loadClientsCollection();
    await clients.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();  // ??? clients.deleteOne({_id: req.params.id}
})
router.patch('/:id',async (req,res) => {
    const clients = await loadClientsCollection();
    var ObjectId = require('mongodb').ObjectID
    var updateObject = req.body;
    res.send(await clients.updateOne({_id : ObjectId(req.params.id)}, {$set: updateObject}));
});

async function loadClientsCollection(){
    const client = await mongodb.MongoClient.connect("mongodb+srv://test:test@cluster0.7zz4o.gcp.mongodb.net/cluster0?retryWrites=true&w=majority",{
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    return client.db('cluster0').collection('clients');

}

module.exports = router;