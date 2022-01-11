//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

//Connection to MongoAtlas and connecting to specific DataBase
mongoose.connect("mongodb+srv://aarezansari:Test123@cluster0.tzdx1.mongodb.net/blogpostsDB", {usenewUrlParser: true});

//Creating schema for structure to store posts
const postSchema = {
  Title: String,
  Body: String
};

//Creating collection on DataBase to where posts are stored
const Post = mongoose.model("Post", postSchema);


const homeStartingContent = new Post({
Title:"Home",
Body:"Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing."
});

const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

const posts = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));



//Get method for home page request from client
app.get("/", function(req, res){
Post.find({}, function(err, arr){
  //Using render method to send variables created in js file to send to ejs file
  res.render("home",{starting : homeStartingContent, posts: arr});

})

});

//Get method for contact page request from client
app.get("/contact", function(req, res){
  res.render("contact",{contactinfo: contactContent});
});
//Get method for about page request from client
app.get("/about", function(req, res){
  res.render("about",{aboutinfo: aboutContent});
});
//Get method for compose page request from client
app.get("/compose", function(req, res){
  res.render("compose");
});

//Get method using route parameters
app.get("/posts/:entry", function(req, res){
  const inquiry = _.lowerCase(req.params.entry);
  const title = req.params.entry;
  console.log(req.params.entry);
  Post.findOne({Title: title}, function(err, post){
    res.render("post", {Title: post.Title, Body: post.Body});
  });
   // posts.forEach(function(post){
   //   const requested = _.lowerCase(post.Title);
   //   if(requested === inquiry){
   //     console.log("Match Found!");
   //     res.render("post",{Title: post.Title, Body: post.Body});
   //   }
   });







//Post method to get information submitted by the user
app.post("/compose", function(req, res){



  const composeInfo = new Post({
    Title :req.body.newTitle,
    Body: req.body.postInfo
  });
  composeInfo.save();

  //posts.push(composeInfo);

res.redirect("/");
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
