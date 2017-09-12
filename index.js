var express = require("express");
var bP = require("body-parser");
var request  = require("async-request");
var fetchUrl = require("fetch").fetchUrl;
var app = express();
var config = require("./public/config/config");
const TODAY = getToday();
var pages = ["", "", "", "", "", TODAY];
var currentPage = 5;

var PORT = process.env.PORT || 5000;
 app.set("view engine", "ejs");
 app.use(bP.urlencoded({extended: true}));
 app.use(express.static("public"));
 
 app.get("/", (req, res) => {
     res.render("index");
 });
 
 app.get("/daily", async (req, res) => {
     var url = (config.tvUrl + pages[currentPage]);
     console.log(url);
     var data = await getData(url);
     var data = cleanData(data);

     res.render("daily", {data: data, theDate: pages[currentPage]});
 });

 app.get("/nextpage", (req, res) => {
     res.redirect("/daily");
 });
 
 app.post("/next", (req, res) => {
     console.log(req.body.data);
     getNextPage();
 });

 app.post("/prev", (req, res) => {
    console.log(req.body.data);
    getPrevPage();
});
 
 app.listen(PORT, () => {
     console.log("Server started on port " + PORT);
 });
 
 // METHODS
 
 function getToday(){
     return new Date().toISOString().slice(0, 10);
 }
 
 async function getData (url) {
    var data = await request(url);
    var json = await JSON.parse(data.body);
    return json;
}

function getNextPage(){
    var oldPage = currentPage;
    console.log(currentPage);
    var temp = pages[currentPage].substring(pages[currentPage].length, pages[currentPage].length - 2);
    temp = +temp + 1;
    currentPage++;
    pages[currentPage] = pages[oldPage].slice(0, pages[oldPage].length - 2) + temp;
}

function getPrevPage(){
    var oldPage = currentPage;
    console.log(currentPage);
    var temp = pages[currentPage].substring(pages[currentPage].length, pages[currentPage].length - 2);
    if(temp > 0){
        temp = +temp - 1;
        currentPage--;
    }
    pages[currentPage] = pages[oldPage].slice(0, pages[oldPage].length - 2) + temp;
}

function cleanData(data){
    for(var item in data){
        if(data[item].show.image == null){
            console.log(data[item].show.name);
            data[item].show.image = config.defautImg;
        }
    }
    return data;
}