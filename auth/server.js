const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("./jwtoken");

const server = express.Router();

server.get("/", (req, res) => {
  res.status(200).json({ api: "Up" });
});

server.post("/register", (req, res) => {
    const user = req.body
    if(jwt.isValid(user)){
        const hash = bcrypt.hashSync(user.password, 12);
        user.password = hash
        //send to database
        //then create a token, res.status(200).json({message: "Welcome", user, token})
    }else{
        res.status(400).json({message: "Please fill all fields, make sure you haven't used that username before!"}).end();
    }
});

server.post("/login", (req, res) => {
  const user = req.body;
  if (jwt.isValid(user)) {
    //findBy(user.username)
    if (user.password === checkedUser.password) {
      //bcrypt checker here
      const token = jwt.generateToken(user);
      res.status(200).json({ message: "Welcome", token, user });
    } else {
      res
        .status(401)
        .json({ message: "Invalid Credentials - could be you, could be me!" })
        .end();
    }
  } else {
    res
      .status(400)
      .json({ message: "Please fill all fields, definitely you" })
      .end();
  }
});

module.exports = server;
