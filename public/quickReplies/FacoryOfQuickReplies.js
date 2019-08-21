const item = require('./quickRepliesItem');

quickRepliesFormat = function(){
    this.version ="2.0",
    this.template = {
        outputs: [{
            simpleText:{text:""}}
        ],
        quickReplies:[]
    }
}

exports.quickRepliesFactory = function(repliesNum, quickRepliesItemFormat){
    let quickReply = new quickRepliesFormat();

    for(let i =0; i < repliesNum; i++){
        quickReply.template.quickReplies.push(new item.item(quickRepliesItemFormat));
        quickReply.template.quickReplies[i].action = quickRepliesItemFormat;
    }
    return quickReply;
}