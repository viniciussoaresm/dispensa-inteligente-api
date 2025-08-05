// models/DespensaItem.js
import mongoose from "mongoose";

const despensaItemSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // ID do usuário dono da despensa
  nome: { type: String, required: true },
  quantidade: { type: Number, required: true, default: 1 },
  dataEntrada: { type: Date, required: true, default: Date.now },
  validade: { type: Date }, // opcional, data de validade
  categoria: { type: String }, // opcional
  observacoes: { type: String }, // opcional
});

const DespensaItem = mongoose.model("items", despensaItemSchema);

export default DespensaItem;
