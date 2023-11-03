const express = require("express");

const UserModel = require("../models/User");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { email } = req.body;
  const { phone } = req.body;

  if (await UserModel.findOne({ email })) {
    return res.status(400).json({
      error: true,
      message: "E-mail do usuário já foi cadastrado",
    });
  }
  if (await UserModel.findOne({ phone })) {
    return res.status(400).json({
      error: true,
      message: "Telefone já cadastrado",
    });
  }

  const User = await UserModel.create(req.body);

  console.log(req.body);
  return res.json({
    error: false,
    message: "Registrado com sucesso",
    data: User,
  });
});

module.exports = router;
