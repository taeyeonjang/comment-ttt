const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const config = require("./config/key");
const mongoose = require("mongoose");
const path = require("path");
const { Comment } = require('./models/Comment');

app.use(express.urlencoded({extended: true}));
app.use('/uploads', express.static('uploads'));

app.use(express.json());
app.use(cookieParser());

app.post('/comment/saveContent', (req, res) => {
  const content = new Comment(req.body)

  content.save((err, result) => {
    if(err) return res.status(400).json({ success: false, err })

    return res.status(200).json({ success: true, result })
  })
})

app.post('/comment/likeupdate', (req, res) => {

  Comment.updateOne({
    _id: req.body._id
  },
    {
      "$inc":
      {
      like: 1
      }
    }
    )
  .exec((err, result)=>{
    if(err) return res.json({ success: false, err })
    return res.json({ success:true, result })
  })
})

app.get('/comment/getcomment', (req, res)=> {
  Comment.find().sort({like:-1})
  .exec((err, comment) => {
    if(err) return res.json({ success: false, err })
        res.status(200).json({ success: true, comment }) 
  })
})

mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(()=> console.log('mongoDB connected'))
  .catch((err) => console.log(err))




if (process.env.NODE_ENV === "production") {

    // Set static folder   
    // All the javascript and css files will be read and served from this folder
    app.use(express.static("client/build"));
  
    // index.html for all page routes    html or routing and naviagtion
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
    });
  }
  
  const port = process.env.PORT || 5100
  
  app.listen(port, () => {
    console.log(`Server Listening on ${port}`)
  });