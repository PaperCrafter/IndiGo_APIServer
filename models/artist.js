const mongoose = require('mongoose');

const artistSchema = mongoose.Schema({
    artist_name:String,
    registered_date:String,
    user_key_list:Array,
    no_available_concerts:String
})

module.exports =mongoose.model('artist',artistSchema);