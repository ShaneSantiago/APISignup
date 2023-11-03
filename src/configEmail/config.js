const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail", // Ou outro provedor de e-mail
  auth: {
    user: "shane.santiago.1@gmail.com",
    pass: "shane5799",
  },
});

module.exports = transporter;
