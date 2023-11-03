const crypto = require("crypto");

// Função para gerar um token único
function generateUniqueToken() {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(20, (err, buf) => {
      if (err) {
        reject(err);
      } else {
        const token = buf.toString("hex");
        resolve(token);
      }
    });
  });
}

module.exports = {
  generateUniqueToken,
};
