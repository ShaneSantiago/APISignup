// users.js
const express = require("express");
const UserModel = require("../models/User");
const userRouter = express.Router();

// Rota para buscar todos os usuários
userRouter.get("/users", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json({
      error: false,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Erro ao buscar usuários",
    });
  }
});

// Rota para obter informações de um usuário específico
userRouter.get("/users/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        error: true,
        message: "Usuário não encontrado.",
      });
    }

    return res.json({
      error: false,
      data: user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: true,
      message: "Erro no servidor. Entre em contato com o suporte.",
    });
  }
});

module.exports = userRouter;
