const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true
    },
    email : {
        type : String,
        required : String,
        unique : true,
        lowercase : true
    },
    phone : {
        type : Number,
        required : true,
    },
    password : {
        type : String,
        required : true,
        minlength: 6
    },
    role : {
        type : String,
        enum : ["superadmin", "admin", "volunteer"],
        defualt : "volunteer"
    },
    status : {
        type : String,
        enum : ["pending", "approved", "suspended"],
        defualt : "pending"
    },

}, {timestamps: true});




const userModel = mongoose.model("user", userSchema);

module.exports= userModel ;