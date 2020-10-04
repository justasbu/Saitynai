const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get orders
router.get('/', async (req,res) => {
   const orders = await loadordersCollection();
   res.send(await orders.find({}).toArray());
});
//Get order

router.get('/:id', async (req,res) => {
   const ordId =  req.params.id;
   const ord = data.find(_ord => _ord.id == ordId);
   if(ord){
       res.json(ord);
   }
   else{
       res.json({message: `item ${ordId} doesnt exist`})
   }
 });

//Add order
router.post('/', async (req, res) => {
    const orders = await loadordersCollection();
    await orders.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });
    res.status(201).send();
});

 
//Delete order
router.delete('/:_id', async (req, res) => {
    const orders = await loadordersCollection();
    await orders.deleteOne({_id: new mongodb.ObjectID(req.params._id)});
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