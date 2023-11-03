const express = require("express");
const UserModel = require("../models/User");
const router = express.Router();

router.post("/register", async (req, res) => {
  const { email, phone } = req.body;

  // Verifique a existência de e-mail e telefone em paralelo
  const [emailExists, phoneExists] = await Promise.all([
    UserModel.findOne({ email }),
    UserModel.findOne({ phone }),
  ]);

  if (emailExists) {
    return res.status(400).json({
      error: true,
      message: "E-mail do usuário já foi cadastrado",
    });
  }

  if (phoneExists) {
    return res.status(400).json({
      error: true,
      message: "Telefone já cadastrado",
    });
  }

  // Se nenhum e-mail ou telefone existir, crie o usuário
  const newUser = new UserModel(req.body);
  await newUser.save();

  console.log(req.body);
  return res.json({
    error: false,
    message: "Registrado com sucesso",
    data: newUser,
  });
});

module.exports = router;
