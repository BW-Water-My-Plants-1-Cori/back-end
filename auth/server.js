const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("./jwtoken");
const db = require("../users/usersModel");
const { generateToken } = require("./jwtoken");

const server = express.Router();

server.get("/", (req, res) => {
  res.status(200).json({ api: "Up" });
});

server.post("/register", (req, res) => {
  const user = req.body;

  if (jwt.isValid(user)) {
    const hash = bcrypt.hashSync(user.password, 12);
    db.add(user)
      .then((user) => {
        if (user) {
          const token = generateToken(user);
          res.status(200).json({ message: "Welcome", user, token }).end();
        } else {
          res
            .status(400)
            .json({ message: "Something went wrong back here." })
            .end();
        }
      })
      .catch((err) => {
        res
          .status(500)
          .json({ message: "Unknown server error", error: err })
          .end();
      });
  } else {
    res
      .status(400)
      .json({
        message:
          "Please fill all fields, make sure you haven't used that username before!",
      })
      .end();
  }
});

server.post("/login", (req, res) => {
  const user = req.body;
  if (jwt.isValid(user)) {
    db.findByName(user)
      .then((ret) => {
        if (ret && bcrypt.compareSync(user.password, ret.password)) {
          const token = jwt.generateToken(user);
          res.status(200).json({ message: "Welcome", token, user });
        } else if (!ret) {
          res
            .status(404)
            .json({
              message:
                "User does not exist. Server may have been reset. Please add a new user and try again. ",
            })
            .end();
        } else {
          res
            .status(401)
            .json({
              message: "Invalid Credentials - could be you, could be me!",
            })
            .end()
            .end();
        }
      })
      .catch((err) => {
        res.status(500).json({ message: "Unknow server error", error: err });
      });
  } else {
    res
      .status(400)
      .json({ message: "Please fill all fields, definitely you" })
      .end();
  }
});

module.exports = server;
