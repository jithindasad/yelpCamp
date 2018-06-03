var mongoose = require("mongoose"),
    Campground = require("./models/campground");
    Comment = require("./models/comment");


var data = [
  { name: "Fire ground",
    image: "https://pixabay.com/get/e83db50929f0033ed1584d05fb1d4e97e07ee3d21cac104497f8c178a1e8b6bb_340.jpg",
    description: "This is a campfire"
  },

  {
    name: "night camp",
    image: "https://pixabay.com/get/e83db50a21f4073ed1584d05fb1d4e97e07ee3d21cac104497f8c178a1e8b6bb_340.jpg",
    description: "This is the constellation camp"
  },

  {
    name: "uniform camp",
    image: "https://farm5.staticflickr.com/4150/4832531195_9a9934b372.jpg",
    description: "This is the uniform camp"
  }
];


function seedDB() {
  Campground.remove({}, function(err, removed){
    if (err) {
      console.log(err);
    }else {
      console.log(removed);
      console.log("campgrounds removed");
      data.forEach(function(seed){
        Campground.create(seed, function(err, campground){
          if (err) {
            console.log(err);
          }else {
            console.log(campground);
            console.log("campground added without comment");
            Comment.create({
              text: "This place is awesome, I like to go there too",
              author: "anonymous"
            }, function (err, comment){
              if (err) {
                console.log(err);
              }else {
                console.log(comment);
                campground.comments.push(comment);
                campground.save();
                console.log("created new campground with comment");
              }
            });
          }
        });
      });
    }
  });
}

module.exports = seedDB;
