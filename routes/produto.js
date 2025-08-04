
// routes/produtos.js
import express from "express";
import Produto from "../models/Produto.js";

const router = express.Router();

// Retorna todos os produtos
router.get("/", async (req, res) => {
  try {
    const produtos = await Produto.find().exec();
    res.json(produtos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar produtos." });
  }
});

// Buscar produto por nome (ex: /produtos/banana)
router.get("/:nome", async (req, res) => {
  try {
    const nome = req.params.nome;
    const produto = await Produto.findOne({ nome: new RegExp(nome, "i") }).exec();
    if (!produto) {
      return res.status(404).json({ error: "Produto não encontrado." });
    }
    res.json(produto);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar produto." });
  }
});

export default router;
