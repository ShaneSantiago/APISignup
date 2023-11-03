const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://APIDB:shane5799@cluster0.twqgvso.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Conexão com o banco de dados estabelecida com sucesso");
  })
  .catch((error) => {
    console.error("Falha ao conectar com o banco de dados:", error);
  });

mongoose.Promise = global.Promise;
module.exports = mongoose;
