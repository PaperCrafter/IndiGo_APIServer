const singleCardFactory = require('./singleCardFactory');
const btnFactory = require('../utils/buttonFactory');
const cardFactory = require('../utils/cards/cardFactory');

exports.factoryOfSingleCard = function(type, btnNum, btnTypes){
    let cardForamt = singleCardFactory.singleCardFactory(type);
    let cardData = cardForamt.template.outputs[0];
    let btnData;

    if(type == 'basic'){
        cardData['basicCard'] = cardFactory.abstractCardFactory(type);
        btnData = cardData.basicCard.buttons;
    }else if(type =='commerce'){
        cardData['commerceCard'] = cardFactory.abstractCardFactory(type);
        btnData = cardData.commerceCard.buttons;
    }

    for(let i =0; i < btnNum; i++){
        btnData.push(btnFactory.abstractButtonFactory(btnTypes[i]));
    }

    return cardForamt;
}