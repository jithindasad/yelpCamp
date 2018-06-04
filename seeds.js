var mongoose = require("mongoose"),
    Campground = require("./models/campground");
    Comment = require("./models/comment");


var data = [
  { name: "Fire ground",
    image: "https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104497f8c07ba7e9bcb1_340.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },

  {
    name: "night camp",
    image: "https://pixabay.com/get/e83db50a21f4073ed1584d05fb1d4e97e07ee3d21cac104497f8c07ba7e9bcb1_340.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },

  {
    name: "uniform camp",
    image: "https://farm5.staticflickr.com/4150/4832531195_9a9934b372.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
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
