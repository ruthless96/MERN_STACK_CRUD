const mongoose = require('mongoose');

const UserSessionSchema = new mongoose.Schema({
    UserId: {
        type: String,
        default: ''
    },
    TimeStamp: {
        type: Date,
        default: Date.now()
    },
    UserName: {
        type: String,
        default: ''
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('UserSession', UserSessionSchema);