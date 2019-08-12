const express = require('express');
const router = express.Router();

const Concert = require('../models/concert');
const buttonFactory = require('../public/utils/buttonFactory');
const thumbnail = require('../public/utils/thumbnailsFormat');
const factoryOfCarousel = require('../public/factoryOfCarousel');



router.get('/', (req,res)=>{
    let btnTypes = ["web", "share"];
    var carousel = factoryOfCarousel.FactoryOfCarousel('basic', 5, 2, btnTypes);

    let concert = Concert.find({artist_name:{'$regex': "AODY", '$options': 'i' }});
    var idx = 0;
    for(i in concert){
        //console.log(carousel.template.outputs[0].items[idx].title)
        console.log(carousel.template.outputs[0].Carousel.items[0]);
        carousel.template.outputs[0].Carousel.items[0] = i.title;
        // = i.title;
        idx++
    }
    

    const responseBody = carousel;

    res.status(200).send(responseBody);
});

router.post('/',(req,res)=>{
    const artist_requested = req.body.userRequest.utterance;

    let btnTypes = ["web", "share"];
    let carousel = factoryOfCarousel.FactoryOfCarousel('basic', 5, 2, btnTypes);

    let concert = Concert.find({artist_name:{'$regex': artist_requested, '$options': 'i' }});
    var idx = 0;
    for(i in concert){
        carousel.template.outputs[0].Carousel.items[idx].title = i.title;
    }
    

    Concert.find({artist_name:{'$regex': artist_requested, '$options': 'i' }})
    .then((data) => {
        let concertFound = data.toArray();


        res.json(data);
    })
    .catch((err)=>{
        console.log(err);
        next(err);
    })

    const responseBody = {
        version: "2.0",
        template: {
        outputs: [
            {
                Carousel: {
                    type:"basicCard",
                    basicCard: {
                        title: "보물상자",
                        description: "보물상자 안에는 뭐가 있을까",
                        thumbnail: {
                        imageUrl: "http://k.kakaocdn.net/dn/83BvP/bl20duRC1Q1/lj3JUcmrzC53YIjNDkqbWK/i_6piz1p.jpg"
                        },
                        profile: {
                        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4BJ9LU4Ikr_EvZLmijfcjzQKMRCJ2bO3A8SVKNuQ78zu2KOqM",
                        nickname: "보물상자"
                        },
                        social: {
                        like: 1238,
                        comment: 8,
                        share: 780
                        },
                        buttons: [
                        {
                            action: "message",
                            label: "열어보기",
                            messageText: "짜잔! 우리가 찾던 보물입니다"
                        },
                        {
                            action:  "webLink",
                            label: "구경하기",
                            webLinkUrl: "https://e.kakao.com/t/hello-ryan"
                        }
                        ]
                    }
                }
            }
        ]
        }
    }

    res.status(200).send(responseBody);

});



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
