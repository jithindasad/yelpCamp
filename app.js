var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    Campground = require("./models/campground"),
    seedDB     = require("./seeds");
    Comment = require("./models/comment");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
seedDB();

app.get("/", function(req, res){
  res.render("landing");
});

//INDEX
app.get("/campgrounds", function(req, res){
  Campground.find({}, function (err, campgrounds) {
    if (err) {
      console.log(err);
    }else {
      res.render("campgrounds/index", {campgrounds: campgrounds});
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
  res.render("campgrounds/new");
})

//SHOW
app.get("/campgrounds/:id", function(req, res){
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
    if (err) {
      console.log(err);
    }else {
      res.render("campgrounds/show", {campground: foundCampground});
    }
  });
});

// ==============
// COMMENTS
// ==============
app.get("/campgrounds/:id/comments/new", function (req, res) {
  Campground.findById(req.params.id, function(err, campground) {
    if (err) {
      console.log(err);
    }else {
      res.render("comments/new", {campground: campground});
      }
  });
});

app.post("/campgrounds/:id/comments", function (req, res){
  Campground.findById(req.params.id, function(err, campground) {
    if (err) {
      console.log(err);
    }else {
      Comment.create(req.body.comment, function(err, comment){
        if (err) {
          console.log(err);
        }else {
          campground.comments.push(comment);
          campground.save();
          res.redirect("/campgrounds/" + campground._id);
        }
      });
    }
  });
});

app.listen(3000, function(){
  console.log("server is running on port 3000");
});
