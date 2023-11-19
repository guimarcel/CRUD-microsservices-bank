const mongoose = require("mongoose");
const table = new mongoose.Schema({
  nome_banco: { type: String, unique: true },
  tipo_conta: { type: String },
  nome_titular: { type: String },
  limite_cartao: { type: String }
});

module.exports = mongoose.model("bank_data", table);
