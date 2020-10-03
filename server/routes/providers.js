const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get providers
router.get('/', async (req,res) => {
   const providers = await loadprovidersCollection();
   res.send(await providers.find({}).toArray());
});
//Get provider

router.get('/:id', async (req,res) => {
    const provider = await loadprovidersCollection();
    await provider.findOne({_id: new mongodb.ObjectID(req.params._id)});
    res.status(200).send(res)
 });

//Add provider
router.provider('/', async (req, res) => {
    const providers = await loadprovidersCollection();
    await providers.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });
    res.status(201).send();
});

 
//Delete provider
router.delete('/:_id', async (req, res) => {
    const providers = await loadprovidersCollection();
    await providers.deleteOne({_id: new mongodb.ObjectID(req.params._id)});
    res.status(200).send('Deleted user /:_id');
});

//connection
async function loadprovidersCollection() {
    const client = await mongodb.MongoClient.connect(
        'mongodb+srv://test:test@cluster0.7zz4o.gcp.mongodb.net/cluster0?retryWrites=true&w=majority',
        {
            useNewUrlParser: true
        });
    
    client.connect(err => {
        const collection = client.db("test").collection("devices");
        // perform actions on the collection object
        client.close();
        });

        return client.db('cluster0').collection('providers');
    
}

module.exports = router;