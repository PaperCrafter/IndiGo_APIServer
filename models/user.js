const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    user_key:String,
    subscribed_artist_list:Array,
    registered_date:Array
})

module.exports =mongoose.model('user',userSchema,'user');