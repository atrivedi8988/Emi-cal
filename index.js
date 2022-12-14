const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const UserModel = require("./users.Schema")



const app = express();
// app.use(express.urlencoded({extended:true}))

app.use(express.json());

mongoose.set("strictQuery",true)

app.get("/", (req, res) => {
  res.send("Home page");
});

app.post("/register", async(req, res) => {
  let {name,email,password} = req.body;
  let user = new UserModel({name,email,password})
  await user.save()
  res.end("success");
});

app.post("/login", async(req, res) => {
    let {email,password} = req.body
    let user = await UserModel.findOne({email,password})
    if(user) res.status(200).send("login successfully");
    else res.status(404).send("wrong credentials")
});

mongoose.connect("mongodb+srv://aman:amantrivedi@cluster0.ddklfbc.mongodb.net/emi-cal").then(() => {
  app.listen(8081, () => {
    console.log("i am hearing on 8080");
  });
});
