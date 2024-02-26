const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "please add a Username"]
    },
    email: {
        type: String,
        required: [true, "please add a User email"],
        unique: [true, "Email address already taken"]
    },
    password: {
        type: String,
        required: [true, "please add a password"]
    },
},{
    timestamps: true,
})

module.exports = mongoose.model("User", userSchema);