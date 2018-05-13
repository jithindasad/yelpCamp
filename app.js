var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res){
  res.render("landing.ejs");
});

app.get("/campgrounds", function(req, res){
  var campgrounds = [
    {name: "kerala", image: "https://pixabay.com/get/ec31b90f2af61c22d2524518b7444795ea76e5d004b0144393f1c870a3e4bc_340.jpg"},
    {name: "goa", image: "https://pixabay.com/get/ea36b7062bf6093ed1584d05fb1d4e97e07ee3d21cac104497f6c070aee9bcb1_340.jpg"},
    {name: "delhi", image: "https://farm2.staticflickr.com/1281/4684194306_18ebcdb01c.jpg"}
  ];
  res.render("campgrounds.ejs", {campgrounds: campgrounds});
});

app.listen(3000, function(){
  console.log("server is running on port 3000");
});
