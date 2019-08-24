//qucik reply action format에는 messege 와 block 이 있습니다.
exports.item = function(quickRepliesItemFormat){
    {
        this.messageText="",
        this.action=quickRepliesItemFormat,
        this.label=""
    }
}