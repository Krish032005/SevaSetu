const mongoose = require("mongoose");

async function ConnectDB(){
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("successfully Database connected !!");
}

module.exports = ConnectDB;