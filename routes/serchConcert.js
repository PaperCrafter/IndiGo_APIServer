const express = require('express');
const router = express.Router();

const Concert = require('../models/concert');
const buttonFactory = require('../public/utils/buttonFactory');
const thumbnail = require('../public/utils/thumbnailsFormat');
const factoryOfCarousel = require('../public/carousel/factoryOfCarousel');


//일정검색
router.post('/',(req,res)=>{
    const artist_requested = req.body.userRequest.utterance;
    //const artist_requested = req.body.artist;
    console.log(artist_requested);

    Concert.find({artist_name:{'$regex': artist_requested, '$options': 'i' }})
    .then((data) => {
        const cardNumber = data.length;
        const cardType= 'basicCard';
        const btnNumber = 2;
        const btnTypes = ["web", "share"];

        let carousel = factoryOfCarousel.FactoryOfCarousel(cardType, cardNumber, btnNumber, btnTypes);

        //console.log(data);
        let idx = 0;
        //console.log(typeof(idx));
        data.map((concert)=>{
            //set card info
            console.log(idx);
            carousel.template.outputs[0].carousel.items[idx].title = concert.title;
            carousel.template.outputs[0].carousel.items[idx].thumbnail.imageUrl = concert.poster_png;
            carousel.template.outputs[0].carousel.items[idx].description = `기간 ${concert.start_date} ~ ${concert.end_date}`
            //carousel.template.outputs[0].Carousel.items[idx].thumbnail.imageUrl = concert.artist_name;
            carousel.template.outputs[0].carousel.items[idx].buttons[0].webLinkUrl = concert.url;
            //carousel.template.outputs[0].Carousel.items[idx].thumbnail.imageUrl = concert.start_date;
            //carousel.template.outputs[0].Carousel.items[idx].thumbnail.imageUrl = concert.end_date;
            idx+=1;
        });
        //console.log(carousel);

        res.json(carousel);
    })
    .catch((err)=>{
        console.log(err);
        next(err);
    })

    //res.status(200).send(responseBody);
});


//공연구독

/*
router.get('/test:artist',(req,res)=>{
    
    Concert.find({artist_name:{'$regex': req.params.artist, '$options': 'i' }})
    .then((data) => {
        
        let btnTypes = ["web", "share"];
        //console.log(data.length);
        let cardNumber = data.length;
        let carousel = factoryOfCarousel.FactoryOfCarousel('basic', cardNumber, btnTypes.length, btnTypes);

        //console.log(data);
        let idx = 0;
        console.log(typeof(idx));
        data.map((concert)=>{
            //set card info
            console.log(idx);
            carousel.template.outputs[0].carousel.items[idx].title = concert.title;
            carousel.template.outputs[0].carousel.items[idx].thumbnail.imageUrl = concert.poster_png;
            carousel.template.outputs[0].carousel.items[idx].description = `기간 ${concert.start_date} ~ ${concert.end_date}`
            //carousel.template.outputs[0].Carousel.items[idx].thumbnail.imageUrl = concert.artist_name;
            carousel.template.outputs[0].carousel.items[idx].buttons[0].webLinkUrl = concert.url;
            //carousel.template.outputs[0].Carousel.items[idx].thumbnail.imageUrl = concert.start_date;
            //carousel.template.outputs[0].Carousel.items[idx].thumbnail.imageUrl = concert.end_date;
            idx+=1;
        });

        res.json(carousel);
    })
    .catch((err)=>{
        console.log(err);
        next(err);
    })
});
*/

module.exports = router;
