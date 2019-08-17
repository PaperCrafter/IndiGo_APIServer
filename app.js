const express = require('express');
const morgan = require('morgan')
const bodyParser = require('body-parser');
var mongoose = require('mongoose');
const db = require('./models/db.js');
const searchSchedule = require('./routes/searchSchedule');
const searchArtist = require('./routes/serchArtist');
const searchConcert = require('./routes/serchConcert');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
db();

app.use('/searchArtist', searchArtist);
app.use('/searchConcert', searchConcert);
app.use('/searchSchedule', searchSchedule);

app.get('/', (req, res)=>{
    res.send('index.html');
})

app.listen(3000, ()=>{
    console.log('app listening at port 3000');
})