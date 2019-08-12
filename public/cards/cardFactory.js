const basicCard = require("./basicCard");
const commerceCard = require("./commerceCard");

exports.abstractCardFactory = function(type){
    switch(type){
        case "basic":
            return new basicCard.basicCardFormat();
        case "commerce":
            return new commerceCard.commerceCard();
    }
};
