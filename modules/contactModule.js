const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "please add a contact name"]
    },
    email: {
        type: String,
        required: [true, "please add a contact name"]
    },
    phone: {
        type: String,
        required: [true, "please add a contact name"]
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
},
{
    timestamps: true,
});

module.exports = mongoose.model("Contact", contactSchema);