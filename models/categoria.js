import mongoose from "mongoose";

const categoriaSchema = new mongoose.Schema({
  categoria_id: { type: Number, required: true },
  nome_categoria: { type: String, required: true },
}, { timestamps: true });

const Categoria = mongoose.model("Categoria", categoriaSchema);
export default Categoria;
