// models/Produto.js
import mongoose from "mongoose";

const produtoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  validade_dias_geladeira: Number,
  validade_dias_ambiente: Number,
  observacoes: String,
  categoria_id: { type: Number, ref: 'categorias' }
}, { timestamps: true });

const Produto = mongoose.model("Produto", produtoSchema);
export default Produto;
