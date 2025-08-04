
import express from "express";
import { verificarToken } from "../middlewares/auth.js";
import ProdutoDespensa from "../models/ProdutoDespensa.js";

const router = express.Router();

// Adicionar produto na despensa do usuário autenticado
router.post("/", verificarToken, async (req, res) => {
  const { nome, quantidade, dataEntrada } = req.body;
  const uid = req.usuario.uid;

  if (!nome || !quantidade) {
    return res.status(400).json({ mensagem: "Nome e quantidade são obrigatórios." });
  }

  try {
    const produto = new ProdutoDespensa({
      uid,
      nome,
      quantidade,
      dataEntrada: dataEntrada ? new Date(dataEntrada) : new Date(),
    });

    await produto.save();
    res.status(201).json({ mensagem: "Produto adicionado à despensa.", produto });
  } catch (err) {
    res.status(500).json({ mensagem: "Erro ao salvar produto.", erro: err.message });
  }
});

// Listar produtos da despensa do usuário autenticado
router.get("/", verificarToken, async (req, res) => {
  const uid = req.usuario.uid;

  try {
    const produtos = await ProdutoDespensa.find({ uid }).sort({ dataEntrada: -1 });
    res.json(produtos);
  } catch (err) {
    res.status(500).json({ mensagem: "Erro ao buscar produtos.", erro: err.message });
  }
});

export default router;
