const express = require("express");

const router = express.Router();

const Pet = require("../models/Pet");

const UserModel = require("../models/User");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.post("/create", async (req, res) => {
  try {
    const { name, owner, age, race, description, gender, typePet, photos } =
      req.body;

    const pet = await Pet.create({
      name,
      owner,
      age,
      race,
      description,
      gender,
      typePet,
      photos,
    });

    const user = await UserModel.findById(owner);
    if (user) {
      user.pets.push(pet._id);
      await user.save();
    }

    return res.json({
      error: false,
      message: "Pet registrado com sucesso",
      data: pet,
    });
  } catch (error) {
    console.error("Erro ao criar o pet:", error);
    return res.status(400).json({
      error: true,
      message: "Erro ao registrar pet",
    });
  }
});

module.exports = router;
