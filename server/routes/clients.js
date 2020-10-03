const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get clients
router.get('/', async (req,res) => {
   const clients = await loadclientsCollection();
   res.send(await clients.find({}).toArray());
});
//Get client

router.get('/:id', async (req,res) => {
    const client = await loadclientsCollection();
    await client.findOne({_id: new mongodb.ObjectID(req.params._id)});
    res.status(200).send(res)
 });

//Add client
router.client('/', async (req, res) => {
    const clients = await loadclientsCollection();
    await clients.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });
    res.status(201).send();
});

 
//Delete client
router.delete('/:_id', async (req, res) => {
    const clients = await loadclientsCollection();
    await clients.deleteOne({_id: new mongodb.ObjectID(req.params._id)});
    res.status(200).send('Deleted user /:_id');
});

//connection
async function loadclientsCollection() {
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

        return client.db('cluster0').collection('clients');
    
}

module.exports = router;