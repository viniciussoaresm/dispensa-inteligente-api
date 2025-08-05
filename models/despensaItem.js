import mongoose from "mongoose";

const despensaItemSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  nome: { type: String, required: true },
  quantidade: { type: Number, required: true, default: 1 },
  dataEntrada: { type: Date, required: true, default: Date.now },
  validade: { type: Date },
  categoria: { type: String },
  observacoes: { type: String },
  categoriaId: { type: Number, ref: 'categorias' },
  produtoId: { type: Number, ref: 'produtos' }
});

const DespensaItem = mongoose.model("despensaItems", despensaItemSchema);

export default DespensaItem;
