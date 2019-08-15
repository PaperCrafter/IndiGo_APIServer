let carousel = require("./carouselFactory");
let cardFactory = require("./cards/cardFactory");
let buttonFactory = require("./utils/buttonFactory");
let thumbnail = require("./utils/thumbnailsFormat");


exports.FactoryOfCarousel = function(type, cardNum, btnNum, btnTypes){
    responseBody = carousel.carouselFactory(type);
    console.log(responseBody.template.outputs[0]);
    
    card_dir = responseBody.template.outputs[0].carousel.items;
    for(var i=0; i < cardNum; i++){
        //add card
        card_dir.push(cardFactory.abstractCardFactory(type));
        //add button
        card_dir[i].buttons.push(buttonFactory.abstractButtonFactory(btnTypes[0]));
        card_dir[i].buttons.push(buttonFactory.abstractButtonFactory(btnTypes[1]));
    }

   return responseBody
}