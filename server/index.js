const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())


//Author Schema
const AuthorSchema = new mongoose.Schema({
  name:String,
  genre:String,
  isDead:{
    type:Boolean,
    default:true
  },
  isMale:{
    type:Boolean,
    default:true
  },
  birthyear:Number,
  imageURL:String
})

//Author Model
const AuthorModel = mongoose.model('Authors', AuthorSchema);



//Author Post
app.post("/api/authors", async(req,res)=>{
  const {name, genre, isMale, isDead, imageURL, birthyear}= req.body;
  const newAuthor = new AuthorModel({
    name:name,
    genre:genre,
    isMale:isMale,
    isDead:isDead,
    imageURL:imageURL,
    birthyear:birthyear
  });
  
  //Author push
  await newAuthor.save();
  res.status(201).send("author succesfully created");
})

//get All Author
app.get("/api/authors", async(req,res)=>{
  const {name}=req.query
  const authors = await AuthorModel.find();
  if(name===undefined){
    res.status(200).send({
      data:authors,
      message:"data get success!"
    })
  }
  else{
    res.status(200).send({
      data: authors.filter((x)=>x.name.toLowerCase().trim().includes(name.toLowerCase().trim())),
      message:"data get success!"
    })
  }
})

//get author by id
app.get("/api/authors/:id", async(req,res)=>{
  const {id}=req.params;
  const author = await AuthorModel.findById(id);
  if(!author){
    res.status(204).send('author not found')
  }
  else{
    res.status(200).send({
      data:author,
      message:"data get success"
    })
  }
})

//delete author
app.delete("/api/authors/:id", async(req,res)=>{
  const id = req.params.id;
  const author = await AuthorModel.findByIdAndDelete(id);
  if(author===undefined){
    res.status(404).send('author not found');
  }
  else{
    res.status(200).send({
      data:author,
      message:"author deleted succesfully"
    })
  }
})

//edit author
app.put("/api/authors/:id", async(req,res)=>{
  const id = req.params.id;
  const {name, genre, imageURL, isDead, isMale,birthyear} = req.body;
  const existedAuthor = await AuthorModel.findByIdAndUpdate(id,{name:name, genre:genre, imageURL:imageURL, isMale:isMale, isDead:isDead, birthyear:birthyear})
  if(existedAuthor==undefined){
    res.status(404).send("author not found!");
  }
  else{
    res.status(200).send(`${name} updated successfully`);
  }
});


DB_CONNECTION = process.env.DB_CONNECTION;
DB_PASSWORD = process.env.DB_PASSWORD;
mongoose.connect(DB_CONNECTION.replace("<password>", DB_PASSWORD))
.then(()=>console.log("Mongo DB connected"))

app.get('/api', (req, res) => {
  res.send('Hello Book Author!')
})

PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})