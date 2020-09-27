const express = require('express');
const bodyParser = require('body-parser'); //parser for json
const path = require('path');
const app = express(); 


app.use(bodyParser.json())
app.use(cors());

const posts = require('./routes/posts')
app.use('/posts',posts)

//Handle production

if (process.env.NODE_ENV === 'production'){
    //static folder
    app.use(express.static(__dirname + '/public'));

    //handle SPA

    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));

}
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}.`));
