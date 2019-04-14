const express = require("express");
const parser = require("body-parser");
var routes = require("./routes/routes.js")
var app = express();
var cors = require('cors')

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(cors({
    exposedHeaders: ['password']
}))

routes(app);

var server = app.listen(8080, function () {
    console.log("Server running at 8080");
});
