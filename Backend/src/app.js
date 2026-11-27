const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");


// Routes 
const authRouter = require("./routes/auth.route");

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use("/api/auth/", authRouter);



module.exports = app;


