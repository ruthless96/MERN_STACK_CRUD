const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const UserSchema = new mongoose.Schema({
    UserId: {
        type: String,
        default: '',
    },
    UserPw: {
        type: String,
        default: '',
    },
    UserName: {
        type: String,
        default: '',
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
})

UserSchema.methods.generateHash = function(pw) {
    let mongobcrypt = bcrypt;
    let salt = mongobcrypt.genSaltSync(8);

    return bcrypt.hashSync(pw, salt, null);
};

UserSchema.methods.validPassword = function(pw) {
    let mongobcrypt = bcrypt;
    return mongobcrypt.compareSync(pw, this.UserPw);
}

module.exports = mongoose.model('User', UserSchema);