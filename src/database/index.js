require("dotenv").config(); // Certifique-se de chamar isso antes de mongoose.connect

const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Conexão com o banco de dados estabelecida com sucesso");
  })
  .catch((error) => {
    console.error("Falha ao conectar com o banco de dados:", error);
  });

mongoose.Promise = global.Promise;
module.exports = mongoose;
