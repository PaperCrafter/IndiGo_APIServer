let carousel = require("./carouselFactory");
let cardFactory = require("./cards/cardFactory");
let buttonFactory = require("./utils/buttonFactory");
let thumbnail = require("./utils/thumbnailsFormat");


exports.FactoryOfCarousel = function(type, cardNum, btnNum, btnTypes){
    let carouselFormat = carousel.carouselFactory(type);
    console.log(carouselFormat.template.outputs[0]);
    
    card_dir = carouselFormat.template.outputs[0].carousel.items;
    for(var i=0; i < cardNum; i++){
        //add card
        card_dir.push(cardFactory.abstractCardFactory(type));
        //add button
        for(var j = 0; j < btnNum; j++){
            card_dir[i].buttons.push(buttonFactory.abstractButtonFactory(btnTypes[j]));
        }
    }

   return carouselFormat
}