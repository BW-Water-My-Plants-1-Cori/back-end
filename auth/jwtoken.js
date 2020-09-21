const jwt = require("jsonwebtoken");
const db = require("../knexconfig");

function generateToken({ id, username }) {
  const payload = {
    username,
    subject: id,
  };
  const config = {
    jwtSecret:
      process.env.JWT_SECRET ||
      "Mountains aren’t just funny. They’re hill areas.",
  };
  const options = {
    expiresIn: "8 hours",
  };

  return jwt.sign(payload, config.jwtSecret, options);
}

function isValid(user) {
  return Boolean(
    user.username && user.password && typeof user.password === "string"
  );
}
function checkUser(req, res, next) {
  const user = req.body;
  db("users")
    .where({ username: user.username })
    .then((ret) => {
      if (ret) {
        res.status(400).json({ message: "this user already exists" }).end();
      } else {
        db("users")
          .where({ email: user.email })
          .then((ret) => {
            if (ret) {
              res
                .status(400)
                .json({ message: "This email is already registered" })
                .end();
            }else{
                next();
            }
          })
          .catch((err) => {
            res.status(500).json({ message: "Something happened" }).end();
          });
      }
    })
    .catch((err) => {
      return res.status(500).json({ message: "Error" }).end();
    });
}

module.exports = { generateToken, isValid, checkUser };
