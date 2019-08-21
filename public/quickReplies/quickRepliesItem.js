//qucik reply action format에는 messege 와 block 이 있습니다.
exports.item = function(quickRepliesItemFormat){
    {
        this.action=quickRepliesItemFormat,
        this.lable="",
        this.messageText=""
        //this.blockId="",
        //this.extra=""
    }
}