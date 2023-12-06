const express = require("express");
const mongoose = require("mongoose");
const UserModel = require("../models/User");
const PetModel = require("../models/Pet");
const userRouter = express.Router();

// ... outras rotas

// Rota para excluir um pet por nome ou ID
userRouter.delete("/pets/:idOrName", async (req, res) => {
  try {
    const { idOrName } = req.params;

    // Verifica se o parâmetro é um ObjectId válido (ID do MongoDB)
    const isObjectId = mongoose.Types.ObjectId.isValid(idOrName);

    let pet;
    if (isObjectId) {
      pet = await PetModel.findByIdAndDelete(idOrName);
    } else {
      pet = await PetModel.findOneAndDelete({ name: idOrName });
    }

    if (!pet) {
      return res.status(404).json({
        error: true,
        message: "Pet não encontrado.",
      });
    }

    // Remover a referência ao pet na lista de pets do usuário
    await UserModel.updateOne({ pets: pet._id }, { $pull: { pets: pet._id } });

    res.json({
      error: false,
      message: "Pet excluído com sucesso.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      message: "Erro ao excluir o pet.",
    });
  }
});

module.exports = userRouter;
