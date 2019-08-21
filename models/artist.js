const mongoose = require('mongoose');

const artistSchema = mongoose.Schema({
    artist_name:String,
    registered_date:Array,
    user_key_list:Array,
})

module.exports =mongoose.model('artist',artistSchema, 'artist');