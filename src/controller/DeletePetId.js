const express = require("express");
const router = express.Router();
const UserModel = require("../models/User");
const PetModel = require("../models/Pet");

// Rota para excluir um pet por ID
router.delete("/pets/:petId", async (req, res) => {
  try {
    const petId = req.params.petId;

    // Verifica se o pet existe
    const pet = await PetModel.findById(petId);
    if (!pet) {
      return res.status(404).json({
        error: true,
        message: "Pet não encontrado.",
      });
    }

    // Remove a referência do pet no dono (usuário)
    await UserModel.findByIdAndUpdate(pet.owner, {
      $pull: { pets: petId },
    });

    // Exclui o pet do banco de dados
    await PetModel.findByIdAndDelete(petId);

    return res.json({
      error: false,
      message: "Pet excluído com sucesso.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: true,
      message: "Erro no servidor. Entre em contato com o suporte.",
    });
  }
});
router.delete("/pets", async (req, res) => {
  try {
    // Remove todas as referências dos pets nos donos (usuários)
    await UserModel.updateMany({}, { $set: { pets: [] } });

    // Exclui todos os pets do banco de dados
    await PetModel.deleteMany({});

    return res.json({
      error: false,
      message: "Todos os pets foram excluídos com sucesso.",
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
