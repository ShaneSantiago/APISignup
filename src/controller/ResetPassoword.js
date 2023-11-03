// const express = require("express");
// const router = express.Router();
// const UserModel = require("../models/User");
// const transporter = require("../configEmail/config"); // Importe o transporter configurado
// const { generateUniqueToken } = require("../configEmail/generetedToken"); // Importe a função para gerar um token único

// // Rota para solicitar recuperação de senha
// router.post("/forgot-password", async (req, res) => {
//   const { email } = req.body;

//   try {
//     // Verifique se o e-mail existe no banco de dados
//     const user = await UserModel.findOne({ email });

//     if (!user) {
//       return res.status(400).json({ error: "E-mail não encontrado" });
//     }

//     // Gere um token de recuperação de senha
//     const token = await generateUniqueToken();

//     // Envie o e-mail com o link de recuperação de senha
//     const resetPasswordLink = `https://seusite.com/reset-password?token=${token}`;
//     transporter.sendMail({
//       from: "seu_email@gmail.com",
//       to: user.email,
//       subject: "Recuperação de senha",
//       html: `<p>Clique no link a seguir para redefinir sua senha: <a href="${resetPasswordLink}">Redefinir senha</a></p>`,
//     });

//     return res.json({ message: "E-mail de recuperação de senha enviado" });
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ error: "Erro ao solicitar recuperação de senha" });
//   }
// });

// module.exports = router;
