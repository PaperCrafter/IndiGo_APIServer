const express = require('express');
const router = express.Router();

const Concert = require('../models/calendar');
const User = require('../models/user');

const factorOfSingleCard = require('../public/singleCard/factoryOfSingleCard');

//구독 신청
//ask subscription
router.post('/', (req,res)=>{
    const btnList

    let singleCard = factorOfSingleCard();
});

//구독 열람
//reading list of artist user subscribed
router.post('/', (req,res)=>{

});


//구독 제거
//delete specific subscribing artist
router.patch('/', (req,res)=>{
    const user = 
});