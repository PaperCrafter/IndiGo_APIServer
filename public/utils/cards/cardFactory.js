const basicCard = require("./basicCard");
const commerceCard = require("./commerceCard");

exports.abstractCardFactory = function(type){
    switch(type){
        case "basicCard":
            return new basicCard.basicCardFormat();
        case "commerceCard":
            return new commerceCard.commerceCard();
    }
};
