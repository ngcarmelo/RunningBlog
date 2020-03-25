const Newsletter = require("../models/newsletter");

function suscribeEmail(req, res) {
  const email = req.params.email;
  const newsletter = new Newsletter();

  if (!email) {
    res.status(404).send({ code: 404, message: "Email required" });
  } else {
    newsletter.email = email.toLowerCase();
    newsletter.save((err, newsletterStore) => {
      if (err) {
        res.status(500).send({ code: 500, message: "Email already exists." });
      } else {
        if (!newsletterStore) {
          res.status(400).send({
            code: 400,
            message: "Error registering the newsletter."
          });
        } else {
          res
            .status(200)
            .send({ code: 200, message: "Email registered correctly." });
        }
      }
    });
  }
}

module.exports = {
  suscribeEmail
};
