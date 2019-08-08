const express = require('express');
const app = express();
const morgan = require('morgan')
const bodyParser = require('body-parser');
var mongoose = require('mongoose');
const db = require('./models/db.js'); 
const serchArtist = require('./routes/serchArtist');
const serchConcert = require('./routes/serchConcert');

app.use(morgan('dev'));
app.use(bodyParser.json());
db();

app.use('/serchArtist', serchArtist);
app.use('/serchConcert', serchConcert);

app.listen(3000, ()=>{
    console.log('app listening at port 3000');
})


