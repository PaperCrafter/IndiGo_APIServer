function Normalbutton(){
    this.action,
    this.label
}

function MessegeButton(){
    this.action = "message",
    this.label,
    this.messageText
}

function PhoneButton(){
    this.action = "phone",
    this.label,
    this.messageText
}

function ShareButton(){
    this.action="share";
    this.label="공유하기"
}

function WebButton(){
    this.action="webLink",
    this.label ="예매하기",
    this.webLinkUrl
}

function webCalendarButton(){
    this.action="webLink",
    this.label="달력으로 보기",
    this.webLinkUrl
}



exports.abstractButtonFactory = function(type){
    switch(type){
        case "messege":
            return new MessegeButton();
        case "phone":
            return new PhoneButton();
        case "share":
            return new ShareButton();
        case "web":
            return new WebButton();
        case "webCalendar":
            return new webCalendarButton();
        default:
            return new Normalbutton();
    }
};
