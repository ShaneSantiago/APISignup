const express = require("express");
const AuthController = require("./controller/AuthController");
const petRoutes = require("./controller/AuthPet");
const userRouter = require("./controller/AllUsers");
const authRoutes = require("./controller/LoginUser");
const userAndPet = require("./controller/AllUserAndPet");
const resetPassword = require("./controller/ResetPassoword");
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
// app.use("/auth", resetPassword);

app.listen(port, () => {
  console.log(`O servidor está em execução na porta ${port}`);
});
