const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    profile: {
        type: String,
        unique: true
    },
    name: {
        type: String,
    },
    image: {
        type: String,
        required: true,
        minLenght: 5
    },
    images: {
        type: Array
    },
    likedMe: {
        type: Boolean,
        default: false
    }
})

const User = mongoose.model('User', userSchema);

module.exports = {
    User,
}