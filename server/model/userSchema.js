const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new mongoose.Schema({
    name: { type: String, default: "", trim: true },
    emailid: { type: String, trim: true },
    password: { type: String, default: "", },
    profile_image: { type: String, default: "https://niuli-images.s3.ap-south-1.amazonaws.com/21372076.jpg" },
    tokens_sessions: [{
        token: { type: String, default: "" },
        logged_in_date: { type: Date, default: new Date().toISOString() }
    }],
    active: { type: Boolean, default: true },
});

UserSchema.plugin(timestamps);
UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Users', UserSchema);