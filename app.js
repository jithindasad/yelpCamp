var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgrounds = [
  {name: "kerala", image: "https://pixabay.com/get/ec31b90f2af61c22d2524518b7444795ea76e5d004b0144393f1c870a3e4bc_340.jpg"},
  {name: "goa", image: "https://pixabay.com/get/ea36b7062bf6093ed1584d05fb1d4e97e07ee3d21cac104497f6c070aee9bcb1_340.jpg"},
  {name: "delhi", image: "https://farm2.staticflickr.com/1281/4684194306_18ebcdb01c.jpg"},
  {name: "kodai", image: "https://farm8.staticflickr.com/7205/7121863467_eb0aa64193.jpg"},
  {name: "kodak", image: "https://farm8.staticflickr.com/7268/7121859753_e7f787dc42.jpg"},
  {name: "wayanad", image: "https://farm8.staticflickr.com/7258/7121861565_3f4957acb1.jpg"},
];

app.get("/", function(req, res){
  res.render("landing");
});

app.get("/campgrounds", function(req, res){
  res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res){
  //get element from form
  var name = req.body.name;
  var image = req.body.image;
  //push to array
  var newCampground = {name: name, image: image};
  campgrounds.push(newCampground);
  res.redirect("campgrounds");
});

app.get("/campgrounds/new", function(req, res){
  res.render("new");
})

app.listen(3000, function(){
  console.log("server is running on port 3000");
});
