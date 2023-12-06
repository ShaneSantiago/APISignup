const express = require("express");
const AuthController = require("./controller/AuthController");
const petRoutes = require("./controller/AuthPet");
const userRouter = require("./controller/AllUsers");
const authRoutes = require("./controller/LoginUser");
const userAndPet = require("./controller/AllUserAndPet");
const resetPassword = require("./controller/ResetPassoword");
const deletePet = require("./controller/deletePet");
const editUser = require("./controller/EditUser");
const petId = require("./controller/PetId");
const editPet = require("./controller/EditPet");
const deleltePetId = require("./controller/DeletePetId");
const sendMessage = require("./controller/SendMessage");
const deleteMessages = require("./controller/DeleteMessages");

const app = express();
app.use(express.json());
const port = 3003;
const mongoose = require("mongoose");

app.get("/", (req, res) => {
  res.send("Funcionando");
});

app.use(express.json());

app.use("/auth", AuthController);
app.use("/auth", userRouter);
app.use("/auth", authRoutes);
app.use("/auth", petRoutes);
app.use("/auth", userAndPet);
app.use("/auth", deletePet);
app.use("/auth", editUser);
app.use("/auth", petId);
app.use("/auth", editPet);
app.use("/auth", deleltePetId);
app.use("/auth", sendMessage);
app.use("/auth", deleteMessages);
// app.use("/auth", resetPassword);

app.listen(port, () => {
  console.log(`O servidor está em execução na porta ${port}`);
});
