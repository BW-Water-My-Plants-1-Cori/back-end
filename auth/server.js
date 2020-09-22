const express = require("express");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");

const jwt = require("./jwtoken");
const db = require("../users/usersModel");
const { generateToken } = require("./jwtoken");
const users = require("../users/usersRoute");
const plants = require("../plants/plantsRoute");
const mw = require("../users/usersMiddleware");

const server = express();

server.use(cors(), express.json(), helmet(), morgan("dev"));
server.use("/users", users);
server.use("/plants", plants);

server.get("/", (req, res) => {
  res.status(200).json({ api: "Up" });
});

server.post("/register", mw.verifyForm, jwt.checkUser, (req, res) => {
  const user = req.body;

  if (jwt.isValid(user) && user.email) {
    const hash = bcrypt.hashSync(user.password, 12);
    user.password = hash;
    db.add(user)
    .then((user) => {
        if (user) {
          const token = generateToken(user);
          res.status(201).json({ message: "Registered", user, token }).end();
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
          db.findById(ret.id)
            .then((user) => {
              const token = jwt.generateToken(user);
              res
                .status(200)
                .json({ message: "Welcome", token, user: user})
                .end();
            })
            .catch((err) => {
              res.status(500).json({ message: "This did not work." }).end();
            });
        } else if (!ret) {
          res
            .status(404)
            .json({
              message: "User does not exist.",
            })
            .end();
        } else {
          res
            .status(401)
            .json({
              message: "Invalid Credentials - could be you, could be me!",
            })
            .end();
        }
      })
      .catch((err) => {
        res
          .status(500)
          .json({ message: "Unknown server error", error: err.message });
      });
  } else {
    res
      .status(400)
      .json({ message: "Please fill all fields, most likely you, maybe me" })
      .end();
  }
});

module.exports = server;
