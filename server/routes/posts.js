const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get posts
router.get('/', async (req,res) => {
   const posts = await loadPostsCollection();
   res.send(await posts.find({}).toArray());
});

//Get post

router.get('/:_id', async (req,res) => {
    const post = await loadPostsCollection();
    res.send(await post.find({}).toArray());
 });

//Add Post
router.post('/', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });
    res.status(201).send();
});

 
//Delete Post
router.delete('/:_id', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.deleteOne({_id: new mongodb.ObjectID(req.params._id)});
    res.status(200).send('Deleted user /:_id');
});

//connection
async function loadPostsCollection() {
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

        return client.db('cluster0').collection('posts');
    
}

module.exports = router;