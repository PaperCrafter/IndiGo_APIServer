const mongoose = require('mongoose');

module.exports = () => {
    function connect() {
        mongoose.connect('mongodb://13.124.87.6/ukov_dev', function(err) {
        if (err) {
            console.error('mongodb connection error', err);
        }
        console.log('mongodb connected');
        });
    }
    connect();
    mongoose.connection.on('disconnected', connect);
    require('./user.js');
    require('./artist.js');
    require('./concert.js');
};
