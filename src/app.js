const express = require('express');
const app = express();
const logger = require('logger');
const bodyParser = require('body-parser');

const apiRouter = require('../routes/serchBand');

app.use(logger('dev'), {});
app.use(bodyParser.json());

app.use('/api', apiRouter);

app.listen(3000, ()=>{
    console.log('app listening at port 3000');
})


