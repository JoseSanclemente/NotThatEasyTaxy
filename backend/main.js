const express = require("express");
const parser = require("body-parser");
var routes = require("./routes/routes.js")
var app = express();

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

routes(app);

var server = app.listen(8080, function () {
    console.log("Server running at 8080");
});
