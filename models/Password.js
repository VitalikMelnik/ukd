const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const PasswordSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model('passwords', PasswordSchema);
