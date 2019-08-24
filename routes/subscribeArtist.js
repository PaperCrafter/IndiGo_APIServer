const express = require('express');
const router = express.Router();
//get db schema
const Concert = require('../models/concert');
const User = require('../models/user');
const Artist = require('../models/artist');

const FacoryOfQuickReplies = require('../public/quickReplies/FacoryOfQuickReplies');
const factorOfSingleCard = require('../public/singleCard/factoryOfSingleCard');
const factoryOfCarousel = require('../public/carousel/factoryOfCarousel');
const simpleText = require('../public/simpleText/simtpleText');

//열람하는 가수 정보



//구독 제거 -> 구독 제거할 가수 리스트 //완료
//delete specific subscribing artist
router.post('/deleteList', (req,res)=>{
    const user_key = req.body.userRequest.user.id;
    const quickRepliesItemFormat = "message";
    //const user_key = req.body.user;

    User.find({'user_key':user_key}).then((subscribedList)=>{
        //console.log(subscribedList.subscribed_artist_list);
        QuickReplyData = FacoryOfQuickReplies.quickRepliesFactory(subscribedList[0].subscribed_artist_list.length, quickRepliesItemFormat);
        QuickReplyData.template.outputs[0].simpleText.text = "구독을 취소하실 가수를 선택해 주세요";
        let idx = 0;

        subscribedList[0].subscribed_artist_list.map((singer) => {
            QuickReplyData.template.quickReplies[idx].label = singer;
            QuickReplyData.template.quickReplies[idx].messageText = singer;
            idx = idx + 1;
        });
        res.json(QuickReplyData);
    })
});


//구독 제거
//delete specific subscribing artist
/*
router.patch('/deleteConfirm', (req,res)=>{
    const artist_requested = req.body.userRequest.utterance;
    const user_key = req.body.userRequest.user.id;
    const quickRepliesItemFormat = "message";
    
    let cardType = 'basic';
    const btnNumber = 1;
    const btnTypes = ["webCalendar"];
    const singleCard = factoryOfSingleCard.factoryOfSingleCard(cardType, 1, btnTypes);


});
*/

//구독 제거//완료
//delete specific subscribing artist
router.post('/deleteConfirm', (req,res)=>{
    const artist_requested = req.body.userRequest.utterance;
    const user_key = req.body.userRequest.user.id;
    //const artist_requested = req.body.artist;
    //const user_key = req.body.user;
    
    let artistList;
    let dateList; 
    //let update = false;

    User.find({'user_key':user_key}).then((subscribedList)=>{
        //console.log(subscribedList[0].subscribed_artist_list);

        let idx =0;
        let idxDelete = -1;
        subscribedList[0].subscribed_artist_list.map((item)=>{
            if(item.toLowerCase() == artist_requested.toLowerCase()){
                idxDelete = idx;
                //update = true;
            }
            idx++;
        });

        if(idxDelete != -1){
            subscribedList[0].subscribed_artist_list.splice(idxDelete,1);
            dateList = subscribedList[0].registered_date.splice(idxDelete, 1);

            artistList = subscribedList[0].subscribed_artist_list;
            dateList = subscribedList[0].registered_date;

            User.updateOne({'user_key': user_key },{ $set: {subscribed_artist_list: artistList ,registered_date: dateList}})
            .then(()=>{
                const simpletext = new simpleText.simpleText(`${artist_requested}가 구독목록에서 제거되었습니다.`);
                res.json(simpletext);
            }).catch(()=>{
                console.log('구독목록에서 제거하기가 실패하였습니다.');
            });
        }
        else{
            const simpletext = new simpleText.simpleText(`${artist_requested}를 구독목록에서 제거하지 못했습니다.`);
            res.json(simpletext);
        }
    });
});

//구독 신청 //테스트 해봐야 함
//ask subscription
/*
router.post('/add', (req, res) => {
    const artist_requested = req.body.userRequest.utterance;
    const btnList = [];
    const btnNum = 2;
    const description = `${artist_requested}의 공연정보를 구독하시겠습니까?`;
    let singleCard = factorOfSingleCard();

});
*/

//구독 승락//완료
router.post('/addConfirm', (req, res) => {
    const artist_requested = req.body.userRequest.utterance;
    const user_key = req.body.userRequest.user.id;
    //const artist_requested = req.body.artist;
    //const user_key = req.body.user;
    
    Artist.find({artist_name:{'$regex': artist_requested, '$options': 'i' }}).then((result)=>{
        if(result.length === 0){
            console.log(result);
            const simpletext = new simpleText.simpleText(`${artist_requested}를 찾을 수 없습니다.`);
            res.json(simpletext);
        }else{
            User.find({'user_key':user_key}).then((subscribedList)=>{
                let isOverlaped = false;

                subscribedList[0].subscribed_artist_list.map((item)=>{
                    if(item.toLowerCase() === artist_requested.toLowerCase()){
                        isOverlaped = true;
                        const simpletext = new simpleText.simpleText(`${artist_requested}는 이미 구독한 가수입니다.`);
                        res.json(simpletext);
                    }
                });
                
                console.log(subscribedList[0].subscribed_artist_list);

                if(isOverlaped === false){
                    let today = new Date();

                    let month = today.getUTCMonth() + 1; //months from 1-12
                    const day = today.getUTCDate();
                    const year = today.getUTCFullYear();

                    if(month <= 10){
                        month = "0" + month;
                    }

                    today = year + "-" + month + "-" + day;

                    subscribedList[0].subscribed_artist_list.push(artist_requested);
                    subscribedList[0].registered_date.push(today);
                    
                    let artistList = subscribedList[0].subscribed_artist_list;
                    let dateList = subscribedList[0].registered_date;

                    User.updateOne({'user_key': user_key },{ $set: {subscribed_artist_list: artistList ,registered_date: dateList}})
                    .then(()=>{
                        const simpletext = new simpleText.simpleText(`${artist_requested}가 구독목록에서 추가되었습니다.`);
                        res.json(simpletext);
                    }).catch(()=>{
                        console.log('구독목록에 추가할 수 없습니다.');
                    });
                }
            });
        }
    })
});


//구독 열람 -> 구독 열람할 가수 리스트 //완료
//reading list of artist user subscribed
router.post('/read', (req, res) => {
     const user_key = req.body.userRequest.user.id;
     const quickRepliesItemFormat = "message";
     //const user_key = req.body.user;
 
     User.find({'user_key':user_key}).then((subscribedList)=>{
         //console.log(subscribedList.subscribed_artist_list);
         QuickReplyData = FacoryOfQuickReplies.quickRepliesFactory(subscribedList[0].subscribed_artist_list.length, quickRepliesItemFormat);
         QuickReplyData.template.outputs[0].simpleText.text = "일정을 열람하실 가수를 선택해 주세요";
         let idx = 0;
 
         subscribedList[0].subscribed_artist_list.map((singer) => {
             QuickReplyData.template.quickReplies[idx].label = singer;
             QuickReplyData.template.quickReplies[idx].messageText = singer;
             idx = idx + 1;
         });

         res.json(QuickReplyData);
     })
});


//구독 열람 // 완료
//reading list of artist user subscribed
router.post('/readArtist', (req, res) => {
    const artist_requested = req.body.userRequest.utterance;
    const user_key = req.body.userRequest.user.id;

    //const user_key = req.body.user;
    //const artist_requested = req.body.artist;

    User.find({'user_key':user_key}).then((subscribedList)=>{
        //console.log(subscribedList[0].subscribed_artist_list);

        //구독 가수 목록에 일치하는 인덱스 찾음
        let idx =0;
        let subcribedDateIdx = -1;
        subscribedList[0].subscribed_artist_list.map((item)=>{
            if(item.toLowerCase() == artist_requested.toLowerCase()){
                subcribedDateIdx = idx;
            }
            idx++;
        });

        if(subcribedDateIdx != -1){
            Concert.find({artist_name:{'$regex': artist_requested, '$options': 'i' },
            start_date:{'$gt':subscribedList[0].registered_date[subcribedDateIdx]}})
            .then((data) => {
                if(data.length == 0){
                    const simpletext = new simpleText.simpleText(`${artist_requested}의 추가 공연이 없습니다.`);
                    res.json(simpletext);
                }else{
                    console.log(data);
                    const cardNumber = data.length;
                    const cardType= 'basic';
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
                        carousel.template.outputs[0].carousel.items[idx].buttons[0].webLinkUrl = concert.url;
                        idx+=1;
                    });
                    //console.log(carousel);

                    res.json(carousel);
                }
            })
            .catch((err)=>{
                console.log(err);
                next(err);
            })
        }
        
    });

});

module.exports = router;