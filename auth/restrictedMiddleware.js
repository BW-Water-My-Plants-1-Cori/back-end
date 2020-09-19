const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token = req.headers.authorization;
    const secret = process.env.JWT_SECRET || "Mountains aren’t just funny. They’re hill areas.";

    if (token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            if (err) {
                res.status(401).json({ message: "Not Allowed" });
            } else {
                req.jwt = decodedToken;

                next();
            }
        });
    } else {
        res.status(401).json({ message: "No token!" });
    }
};
