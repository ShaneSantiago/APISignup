const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Pet = require("../models/Pet"); // Make sure to adjust the path based on your project structure

// Route to edit the name, race, age, or description of a pet
router.put("/pet/:petId", async (req, res) => {
  const { petId } = req.params;
  const { name, race, age, description } = req.body;

  try {
    // Check if the pet exists
    const pet = await Pet.findById(petId);
    if (!pet) {
      return res.status(404).json({ message: "Pet not found." });
    }

    // Update the necessary fields
    if (name) pet.name = name;
    if (race) pet.race = race;
    if (age) pet.age = age;
    if (description) pet.description = description;

    // Save the changes to the database
    await pet.save();

    res.json({ message: "Pet updated successfully.", pet });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating pet." });
  }
});

module.exports = router;
