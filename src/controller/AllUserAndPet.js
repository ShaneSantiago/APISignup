const express = require("express");
const UserModel = require("../models/User");
const PetModel = require("../models/Pet");
const userRouter = express.Router();

// Rota para buscar todos os usuários e seus pets
userRouter.get("/users/with/pets", async (req, res) => {
  try {
    const usersWithPets = await UserModel.find().populate("pets");

    res.json({
      error: false,
      data: usersWithPets,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Erro ao buscar usuários e pets",
    });
  }
});

module.exports = userRouter;
