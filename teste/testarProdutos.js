import mongoose from 'mongoose';

const uri = 'mongodb+srv://vinimsn093:BOSokFpx29GKNbCB@foods-days.8oqkapp.mongodb.net/foods-days';
await mongoose.connect(uri);

const produtoSchema = new mongoose.Schema({
  nome: String,
  validade_dias_geladeira: Number,
  validade_dias_ambiente: Number,
  observacoes: String,
  categoria_id: Number
});

const Produto = mongoose.model('Produto', produtoSchema, 'produtos'); // Nome real da coleção!

const produtos = await Produto.find();
console.log(produtos.length > 0 ? produtos : 'Nenhum produto encontrado.');

await mongoose.disconnect();
