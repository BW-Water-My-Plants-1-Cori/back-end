const jwt = require('jsonwebtoken')

function generateToken({ id, username }) {
    const payload = {
        username,
        subject: id,
    };
    const config = {
        jwtSecret: process.env.JWT_SECRET || "Mountains aren’t just funny. They’re hill areas.",
    };
    const options = {
        expiresIn: "8 hours",
    };

    return jwt.sign(payload, config.jwtSecret, options);
}

function isValid(user){
    function isValid(user) {
        return Boolean(user.username && user.password && typeof user.password === "string");
      }
      
}

module.exports = {generateToken, isValid}