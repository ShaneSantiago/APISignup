const mongoose = require("../database/index");

const PetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Referência ao modelo de usuário
    required: true,
  },
  // Outros campos relacionados ao pet, como espécie, raça, etc.
  // ...
  race: {
    type: String,
  },
  description: {
    type: String,
  },
  age: {
    type: String,
  },
  gender: {
    type: String,
  },
  typePet: {
    type: String,
  },
  photos: [{ type: String }], // Novo campo para armazenar as fotos
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Pet = mongoose.model("Pet", PetSchema);

module.exports = Pet;
