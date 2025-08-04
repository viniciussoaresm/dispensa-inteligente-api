
import mongoose from "mongoose";

const ProdutoDespensaSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
    index: true
  },
  nome: {
    type: String,
    required: true,
  },
  quantidade: {
    type: Number,
    required: true,
    min: 1
  },
  dataEntrada: {
    type: Date,
    default: Date.now,
  }
});

const ProdutoDespensa = mongoose.model("ProdutoDespensa", ProdutoDespensaSchema);
export default ProdutoDespensa;
