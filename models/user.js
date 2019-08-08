const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    user_key:String,
    subscribed_artist_list:Array,
    registered:String
})

module.exports =mongoose.model('User',userSchema);