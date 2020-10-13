const express = require('express');
const bodyParser = require('body-parser'); //parser for json
const cors = require('cors');
const mongoose = require('mongoose');


const app = express(); 

//Middleware
app.use(bodyParser.json())
app.use(cors());

mongoose.connect('mongodb+srv://test:test@cluster0.7zz4o.gcp.mongodb.net/cluster0?retryWrites=true&w=majority',
{
 useNewUrlParser:true,
 useUnifiedTopology:true

});

const providers = require('./routes/api/providers')
app.use('/api/providers', providers);

const clients = require('./routes/api/clients')
app.use('/api/clients', clients);

const orders = require('./routes/api/orders')
app.use('/api/orders', orders);

if(process.env.NODE_ENV === 'production'){

    //Static folder
    app.use(express.static(__dirname + '/public'));

    //Handle SPA

    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}.`));
