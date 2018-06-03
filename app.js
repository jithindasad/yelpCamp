var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    Campground = require("./models/campground"),
    seedDB     = require("./seeds");

seedDB();
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", function(req, res){
  res.render("landing");
});

//INDEX
app.get("/campgrounds", function(req, res){
  Campground.find({}, function (err, campgrounds) {
    if (err) {
      console.log(err);
    }else {
      res.render("index", {campgrounds: campgrounds});
    }
  })
});

//NEW
app.post("/campgrounds", function(req, res){
  //get element from form
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  //push to array
  var newCampground = {name: name, image: image, description: desc};
  Campground.create(newCampground, function(err, newlyCreated){
    if (err) {
      console.log(err);
    }else {
      res.redirect("/campgrounds");
    }
  })
});

//CREATE
app.get("/campgrounds/new", function(req, res){
  res.render("new");
})

//SHOW
app.get("/campgrounds/:id", function(req, res){
  Campground.findById(req.params.id, function(err, foundCampground){
    if (err) {
      console.log(err);
    }else {
      res.render("show", {campground: foundCampground});
    }
  })
});


app.listen(3000, function(){
  console.log("server is running on port 3000");
});
