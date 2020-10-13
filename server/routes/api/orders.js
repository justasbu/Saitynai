const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();

const Order = require('../models/order')
const Client = require('../models/client');

//Get order clients
router.get('/:id/clients/:clientID',async (req,res) => {
    Order.findById(req.params.id)
    .populate('client')
    .exec()
    .then(order =>{
        if(!order){
            return res.status(404).json({
                message: "Order not found"
            })
        }
        res.status(200).json({
            
            order: order,
            TEST: order.client.clientID,
            request: {
                type: 'GET',
                url:'http://localhost:5000/api/orders' 
               
            }
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
});

//Get order
router.get('/:id',async (req,res) => {
    Order.findById(req.params.id)
    .populate('client')
    .exec()
    .then(order =>{
        if(!order){
            return res.status(404).json({
                message: "Order not found"
            })
        }
        res.status(200).json({
            order: order,
            request: {
                type: 'GET',
                url:'http://localhost:5000/api/orders' 
            }
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
});

//Get orders
router.get('/',async (req,res) => {
    Order.find()
    //.select('client quantity _id')
    .populate('client')
    .exec()
    .then(docs => {
        res.status(200).json({
            count: docs.length,
            orders: docs.map(doc => {
                return {
                    _id: doc._id,
                    client: doc.client,
                    quantity: doc.quantity,
                    request: {
                        type: 'GET',
                        url:'http://localhost:5000/api/orders'+doc._id 
                    }
                }
            })
            
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });

});
//Add order
router.post('/', async (req,res) =>{
    Client.findById(req.body.clientID)
    .then(client => { 
        if(!client){
            return res.status(404).json({
             message: 'Client not found'   
            })
        }
        const order = new Order({
            _id: mongoose.Types.ObjectId(),
            quantity: req.body.quantity,
            client: req.body.clientID
    
        });
       return order.save()
        
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
    })
    .then(result =>{
        console.log(result),
        res.status(201).json({
            message: 'Order stored',
            createdOrder: {
            _id: result._id,
            client: result.client,
            quantity: result.quantity
            },
            request: {
                type: 'GET',
                url:'http://localhost:5000/api/orders' + result._id 
            }
        });
    })
    .catch(err => {
        res.status(500).json({
            message: "Client not found",
            error: err
        })
    })
 

})

//Delete order
router.delete('/:id', async (req,res) =>{
    Order.remove({_id: req.params.id})
    .exec()
    .then(result =>{
        console.log(result),
        res.status(201).json({
            message: 'Order deleted',
          
            request: {
                type: 'GET',
                url:'http://localhost:5000/api/orders',
                body: {id: 'ID', quantity: 'Number'}
            }
        });
    })
    .catch(err => {
        res.status(500).json({
            message: "Client not found",
            error: err
        })
    })
 

})

router.patch('/:id',async (req,res) => {
    const id = req.params.id;
    const updateOps = {};
    for (const ops of req.body){
        updateOps[ops.propName] = ops.value
    }
   Order.update({_id: id}, {$set: updateOps})
   .exec()
   .then(result => {
       console.log(result);
       res.status(200).json(result);
   })
   .catch(err => {
    console.log(err);
    res.status(500).json({
        error: err
    })
})
});

module.exports = router;