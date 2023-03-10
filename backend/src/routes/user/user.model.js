const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    notification: { type:Array, default:[] },
    events:{ type:Array, default:[] }
})

const User = mongoose.model('user', userSchema);

module.exports = User;