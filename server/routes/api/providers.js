const { text } = require('body-parser');
const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//Get provider
router.get('/:id',async (req,res) => {
    const providers = await loadProvidersCollection();
    var ObjectId = require('mongodb').ObjectID
    res.send(await providers.findOne({_id : ObjectId(req.params.id)}));
});
//Get providers
router.get('/',async (req,res) => {
    const providers = await loadProvidersCollection();
    res.send(await providers.find({}).toArray());
});
//Add provider
router.post('/', async (req,res) =>{
    const providers = await loadProvidersCollection();
    await providers.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });
    res.status(201).send();
})

//Delete provider
router.delete('/:id', async (req,res) =>{
    const providers = await loadProvidersCollection();
    await providers.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();  // ??? providers.deleteOne({_id: req.params.id}
})


router.patch('/:id',async (req,res) => {
    const providers = await loadProvidersCollection();
    var ObjectId = require('mongodb').ObjectID
    res.send(await providers.findOne({_id : ObjectId(req.params.id), text: "NEW NEW NEW"}));
});


async function loadProvidersCollection(){
    const client = await mongodb.MongoClient.connect("mongodb+srv://test:test@cluster0.7zz4o.gcp.mongodb.net/cluster0?retryWrites=true&w=majority",{
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    return client.db('cluster0').collection('providers');

}

module.exports = router;