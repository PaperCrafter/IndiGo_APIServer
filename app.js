const express = require('express');
const app = express();
const morgan = require('morgan')
const bodyParser = require('body-parser');

const apiRouter = require('./routes/serchBand');

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/api', apiRouter);

app.listen(3000, ()=>{
    console.log('app listening at port 3000');
})


