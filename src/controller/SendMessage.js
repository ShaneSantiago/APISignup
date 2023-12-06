// messages.js
const express = require("express");
const router = express.Router();
const MessageModel = require("../models/Message");
const UserModel = require("../models/User");

// Endpoint para enviar mensagem
router.post("/send", async (req, res) => {
  try {
    const { senderId, recipientId, content } = req.body;

    if (!senderId || !recipientId || !content) {
      return res.status(400).json({
        error: true,
        message:
          "Por favor, forneça remetente, destinatário e conteúdo da mensagem.",
      });
    }

    const sender = await UserModel.findById(senderId);
    const recipient = await UserModel.findById(recipientId);

    if (!sender || !recipient) {
      return res.status(404).json({
        error: true,
        message: "Remetente ou destinatário não encontrado.",
      });
    }

    const message = await MessageModel.create({
      sender: senderId,
      recipient: recipientId,
      content: content,
    });

    // Adiciona a mensagem aos arrays correspondentes no modelo de usuário
    sender.sentMessages.push(message._id);
    recipient.receivedMessages.push(message._id);

    // Salva as alterações nos modelos de usuário
    await sender.save();
    await recipient.save();

    return res.json({
      error: false,
      message: "Mensagem enviada com sucesso.",
      data: message,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: true,
      message: "Erro no servidor. Entre em contato com o suporte.",
    });
  }
});

// Endpoint para obter mensagens de um usuário específico
router.get("/inbox/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        error: true,
        message: "Usuário não encontrado.",
      });
    }

    const sentMessages = await MessageModel.find({ sender: userId }).populate(
      "sender recipient",
      "name"
    );

    const receivedMessages = await MessageModel.find({
      recipient: userId,
    }).populate("sender recipient", "name");

    const messages = sentMessages.concat(receivedMessages);

    // Ordena as mensagens por data de criação
    messages.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

    return res.json({
      error: false,
      data: messages,
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

// Endpoint para obter estatísticas de mensagens de um usuário específico
router.get("/message-stats/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        error: true,
        message: "Usuário não encontrado.",
      });
    }

    const sentMessageCount = await MessageModel.countDocuments({
      sender: userId,
    });
    const receivedMessageCount = await MessageModel.countDocuments({
      recipient: userId,
    });

    return res.json({
      error: false,
      data: {
        sentMessages: sentMessageCount,
        receivedMessages: receivedMessageCount,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: true,
      message: "Erro no servidor. Entre em contato com o suporte.",
    });
  }
});
