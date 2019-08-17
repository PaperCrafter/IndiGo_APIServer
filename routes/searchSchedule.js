const express = require('express');
const router = express.Router();

const Calendar = require('../models/calendar');
const factoryOfSingleCard = require('../public/singleCard/factoryOfSingleCard');


//달력보기
router.post('/',(req,res)=>{
    const artist_requested = req.body.userRequest.utterance;
    //const artist_requested = req.body.artist;
    console.log(artist_requested);

    Calendar.find({artist_name:{'$regex': artist_requested, '$options': 'i' }})
    .then((data) => {
        //console.log(data.length);
        
        let cardType = 'basicCard';
        const btnNumber = 1;
        let btnTypes = ["webCalendar"];
        let singleCard = factoryOfSingleCard.factoryOfSingleCard(cardType, 2, btnTypes);

        //console.log(data);
        //console.log(typeof(idx));
        //png, description : 공연일정을 달력으로 보시겠습니까?, btn:달력으로 보기
        
        /*Concert data foramt
        artist_name:String,
        image_url:String,
        calendar_url:String
        */

        console.log(idx);
        /*
        data.map((calendar)=>{
            calendar.image_url
        })*/

        singleCard.template.outputs[0][cardType].description = "공연일정을 달력으로 보시겠습니까?"
        singleCard.template.outputs[0][cardType].thumbnail.imageUrl = data[0].image_url;
        //carousel.template.outputs[0].carousel.items[idx].description = `기간 ${concert.start_date} ~ ${concert.end_date}`
        //carousel.template.outputs[0].Carousel.items[idx].thumbnail.imageUrl = concert.artist_name;
        singleCard.template.outputs[0][cardType].buttons[0].webLinkUrl = data[0].calendar_url;

        //console.log(carousel);

        res.json(singleCard);
    })
    .catch((err)=>{
        console.log(err);
        next(err);
    })

    //res.status(200).send(responseBody);
});