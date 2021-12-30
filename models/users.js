const mongoose = require('mongoose');

let userSchema = mongoose.Schema ({
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    username: String,
    token: String,
})

let userModel = mongoose.model('users', userSchema);
module.exports = userModel;