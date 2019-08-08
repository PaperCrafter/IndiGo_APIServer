const express = require('express');
const router = express.Router();

const Concert = require('../models/concert');

router.get('/:artist',(req,res)=>{
    Concert.find({artist_name:{'$regex': req.params.artist, '$options': 'i' }})
    .then((data) => {
        res.json(data);
    })
    .catch((err)=>{
        console.log(err);
        next(err);
    })
});

module.exports = router;