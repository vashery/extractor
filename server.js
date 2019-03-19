const express = require("express");
var exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const schedule = require("node-schedule");
const extractor = require("./commands/extractor.js");
const folderscan = require("./commands/folderscan.js");
const sender = require("./commands/sender.js");
const db = require("./models");

mongoose.connect("mongodb://localhost/extractor", { useNewUrlParser: true });
var PORT = 3000;

// Initialize Express
var app = express();

// Configure middleware

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

app.engine(
    "handlebars",
    exphbs({
        defaultLayout: "main"
    })
);
app.set("view engine", "handlebars");

// Routes

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

let scan = schedule.scheduleJob('30 * * * * *', function () {

    console.log("scan job ran");
    folderscan();

});

let send = schedule.scheduleJob('40 * * * * *', function () {

    console.log("send job ran");
    sender();

});

let extract = schedule.scheduleJob('* * * * *', function () {

    console.log("extract job ran");
    extractor();

});
// Start the server
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});
