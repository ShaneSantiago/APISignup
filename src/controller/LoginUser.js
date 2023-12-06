const express = require("express");
const router = express.Router();
const UserModel = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Rota para o login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: true,
        message: "Por favor, forneça o email e a senha.",
      });
    }

    const user = await UserModel.findOne({ email }).select("+password");

    if (!user) {
      return res.status(404).json({
        error: true,
        message: "Usuário não encontrado.",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        error: true,
        message: "Credenciais inválidas. Verifique a senha.",
      });
    }

    const token = jwt.sign({ userId: user._id }, "sua_chave_secreta", {
      expiresIn: "1h",
    });

    return res.json({
      error: false,
      message: "Login bem-sucedido",
      token: token,
      userData: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        city: user.city,
        pets: user.pets,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: true,
      message: "Erro no servidor. Entre em contato com o suporte.",
    });
  }
});

module.exports = router;
