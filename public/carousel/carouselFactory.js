function Carousel_format_basic (){
    this.version = "2.0",
    this.template={
        outputs:[
            {
                carousel: {
                    type:"basicCard",
                    items: []
                }
            }
        ]
    }
}

function Carousel_format_comerce (){
    this.version = "2.0",
    this.template={
        outputs:[
            {
                carousel: {
                    type:"commerceCard",
                    items: []
                }
            }
        ]
    }
}


exports.carouselFactory = function(type){
    switch(type){
        case "basic":
            return new Carousel_format_basic()
        case "commerce":
            return new Carousel_format_comerce()
    }
}
