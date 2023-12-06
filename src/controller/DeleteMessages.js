const express = require("express");
const router = express.Router();
const MessageModel = require("../models/Message");
const UserModel = require("../models/User");

// ... (outros endpoints)

router.delete("/delete-conversation/:userId/:otherUserId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const otherUserId = req.params.otherUserId;

    // Verificar se o usuário autenticado é o mesmo que está solicitando a exclusão
    if (userId !== req.user._id.toString()) {
      return res.status(403).json({
        error: true,
        message: "Acesso não autorizado.",
      });
    }

    const user = await UserModel.findById(userId);

    // Encontrar e remover a conversa entre os usuários
    user.conversations = user.conversations.filter((conv) =>
      conv.users.includes(otherUserId)
    );

    await user.save();

    return res.json({
      error: false,
      message: "Conversa excluída com sucesso.",
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
