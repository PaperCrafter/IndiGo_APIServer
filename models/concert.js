const mongoose = require('mongoose');

const concert = mongoose.Schema({
    artist_name:String,
    title:String,
    url:String,
    start_date:String,
    end_date:Array,
    crawled_date:String
})

module.exports = mongoose.model('concert', concert, 'concert');