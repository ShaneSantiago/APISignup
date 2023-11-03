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

module.exports = userRouter;
