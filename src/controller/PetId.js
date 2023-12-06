const express = require("express");
const router = express.Router();
const UserModel = require("../models/User");
const PetModel = require("../models/Pet");

// Rota para obter todos os pets de um usuário por ID
router.get("/user/:userId/pets", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Verifica se o usuário existe
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        error: true,
        message: "Usuário não encontrado.",
      });
    }

    // Obtém todos os pets do usuário
    const pets = await PetModel.find({ owner: userId });

    return res.json({
      error: false,
      message: "Pets do usuário recuperados com sucesso",
      pets: pets,
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
