const express = require('express');
const bodyParser = require('body-parser'); //parser for json
const cors = require('cors');

const app = express(); 

//Middleware
app.use(bodyParser.json())
app.use(cors());

const providers = require('./routes/api/providers')
app.use('/api/providers', providers);

const clients = require('./routes/api/clients')
app.use('/api/clients', clients);

const orders = require('./routes/api/orders')
app.use('/api/orders', orders);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}.`));
