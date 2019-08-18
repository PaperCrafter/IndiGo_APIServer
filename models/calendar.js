const mongoose = require('mongoose');

const calendar = mongoose.Schema({
    artist_name:String,
    image_url:String,
    public_url:String
})

module.exports = mongoose.model('calendar', calendar, 'calendar');