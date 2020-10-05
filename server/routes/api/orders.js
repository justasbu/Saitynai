const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//Get order
router.get('/:id',async (req,res) => {
    const orders = await loadOrdersCollection();
    var ObjectId = require('mongodb').ObjectID
    res.send(await orders.findOne({_id : ObjectId(req.params.id)}));
});
//Get orders
router.get('/',async (req,res) => {
    const orders = await loadOrdersCollection();
    res.send(await orders.find({}).toArray());
});
//Add order
router.post('/', async (req,res) =>{
    const orders = await loadOrdersCollection();
    await orders.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });
    res.status(201).send();
})

//Delete order
router.delete('/:id', async (req,res) =>{
    const orders = await loadOrdersCollection();
    await orders.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();  // ??? orders.deleteOne({_id: req.params.id}
})
router.patch('/:id',async (req,res) => {
    const orders = await loadOrdersCollection();
    var ObjectId = require('mongodb').ObjectID
    var updateObject = req.body;
    res.send(await orders.updateOne({_id : ObjectId(req.params.id)}, {$set: updateObject}));
});

async function loadOrdersCollection(){
    const client = await mongodb.MongoClient.connect("mongodb+srv://test:test@cluster0.7zz4o.gcp.mongodb.net/cluster0?retryWrites=true&w=majority",{
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    return client.db('cluster0').collection('orders');

}

module.exports = router;