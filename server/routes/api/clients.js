const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Client = require('../models/client')
const Order = require('../models/order')

//Get client
router.get('/:id',async (req,res) => {
    const id = req.params.id;
    Client.findById(id)
    .exec()
    .then(doc => {
        console.log(doc);
        res.status(200).json(doc)   
    })
    .catch(err =>{ 
        console.log(err);
        res.status(500).json({error:err})
    });
})
    
//Get clients
/*router.get('/',async (req,res) => {
    Client.find()
    .exec().
    then(docs => {
        console.log(docs);
          res.status(200).json(docs)          
    })
    .catch(err => {
        console.log(err);;
        res.status(500).json({
            error: err
        });
    });
});*/
router.get('/',async (req,res) => {
    Client.find()
   // .select('order quantity _id')
    .populate('order')
    .exec()
    .then(docs => {
        res.status(200).json({
            count: docs.length,
            clients: docs.map(doc => {
                return {
                    _id: doc._id,
                    name: doc.name,
                    price: doc.price,
                    order: doc.order
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

//Add client
router.post('/', async (req,res) =>{
    const client = new Client({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        order: req.body.order
    });
     client.save().then(result => {
        console.log(result);
        res.status(201).json({
            createdClient: result
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    })
})

//Delete client
router.delete('/:id', async (req,res) =>{
    const id = req.params.id;
   Client.deleteOne({_id: id}).exec()
   .then(result =>{
       res.status(200).json(result);
   })
   .catch(err => {
       console.log(err);
       res.status(500).json({
           error: err
       })
   })
});

//Update client
router.patch('/:id',async (req,res) => {
    const id = req.params.id;
    const updateOps = {};
    for (const ops of req.body){
        updateOps[ops.propName] = ops.value
    }
   Client.update({_id: id}, {$set: updateOps})
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
