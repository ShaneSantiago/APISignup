const express = require("express");
// const AuthController = require("./controller/AuthController");
const app = express();
app.use(express.json());
const port = 3003;
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://APIDB:shane5799@cluster0.twqgvso.mongodb.net/?retryWrites=true&w=majority"
);

app.get("/", (req, res) => {
  res.send("Funcionando");
});

const User = mongoose.model("Usuario", {
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  phone: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

app.post("/", async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
    city: req.body.city,
  });
  await user.save();
  res.send(user);
});

app.use(express.json());

// app.use("/auth", AuthController);

app.listen(port, () => {
  console.log(`O servidor está em execução na porta ${port}`);
});
