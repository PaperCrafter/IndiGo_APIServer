exports.simpleText = function(msg){

    this.version = "2.0",
    this.template={
        outputs: [
            {
                simpleText: {
                    text: msg
                }
            }
        ]
    }

}