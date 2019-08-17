function singleCardBasic(){
    {
        this.version= "2.0",
        this.template= {
            outputs=[
                    {
                    basicCard: {
                        
                    }
                }
            ]
        }
    }
}

function singleCardCommerce(){
    {
        this.version= "2.0",
        this.template= {
            outputs=[
                {
                    commerceCard:{
                        
                    }
                }
            ]
        }
    }
}

exports.singleCardFactory = function(type){
    if(type == 'basic'){
        return new singleCardBasic();
    }
    else if(type == 'commerce'){
        return new singleCardCommerce();
    }
}