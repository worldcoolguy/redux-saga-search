var mongoose = require('mongoose');

var timestamps = require('mongoose-timestamp');
var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        default: ''
    }
});
UserSchema.plugin(timestamps);
mongoose.model('User', UserSchema);
module.exports = mongoose.model('User', UserSchema)
