function verifyPlant(req, res, next) {
  db.findById(req.params.id)
    .then((plant) => {
      if (plant) {
        next();
      } else {
        res.status(404).json({ message: "No Plant by that Id" }).end();
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Unknown", error: err.message }).end();
    });
}

module.exports = {verifyPlant}