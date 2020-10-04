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
    const order = await loadordersCollection();
    await order.findOne({_id: new mongodb.ObjectID(req.params._id)});
    res.status(200).send(res)
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
async function loadordersCollection() {
    const order = await mongodb.Mongoorder.connect(
        'mongodb+srv://test:test@cluster0.7zz4o.gcp.mongodb.net/cluster0?retryWrites=true&w=majority',
        {
            useNewUrlParser: true
        });
    
    order.connect(err => {
        const collection = order.db("test").collection("devices");
        // perform actions on the collection object
        order.close();
        });
        
        return order.db('cluster0').collection('orders');
    
}

module.exports = router;