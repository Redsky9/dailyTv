var express = require("express");
var bP = require("body-parser");
var request  = require("request");
var fetch = require("fetch").fetchUrl;
var app = express();
var config = require("./public/config/config");

var PORT = process.env.PORT || 5000;
 app.set("view engine", "ejs");
 app.use(bP.urlencoded({extended: true}));
 app.use(express.static("public"));
 
 app.get("/", (req, res) => {
     res.render("index");
 });
 
 app.get("/daily", (req, res) => {
     var url = (config.tvUrl +  getToday());
     var x = getData(url);
     console.log(x);
     res.render("daily");
 });
 
 app.post("/", (req, res) => {
     
 });
 
 app.listen(PORT, () => {
     console.log("Server started on port " + PORT);
 });
 
 // METHODS
 
 function getToday(){
     return new Date().toISOString().slice(0, 10);
 }
 
 function getData(url){
    request(url, (err, status, response) => {
        if(err) throw err;
        response = JSON.parse(response);
        // console.log(response);
    });
 }