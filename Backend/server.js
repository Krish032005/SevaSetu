require("dotenv").config();
const app = require("./src/app");
const ConnectDB = require("./src/db/db");
const dns = require("dns");
dns.setServers([
    "1.1.1.1",
    "8.8.8.8"
]);

ConnectDB();

app.listen(3000, ()=>{
    console.log("server running on port 3000 !!");
});

