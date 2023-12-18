const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/User"); // Certifique-se de ajustar o caminho conforme a estrutura do seu projeto

// Rota para editar o nome ou email do usuário
router.put("/user/:userId", async (req, res) => {
  const { userId } = req.params;
  const { name, email, phone } = req.body;

  try {
    // Verifique se o usuário existe
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    // Atualize os campos necessários
    if (name) user.name = name;
    if (email) user.email = email;
    if (phone) user.phone = phone;

    // Salve as alterações no banco de dados
    await user.save();

    res.json({ message: "Usuário atualizado com sucesso.", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao atualizar usuário." });
  }
});

module.exports = router;
