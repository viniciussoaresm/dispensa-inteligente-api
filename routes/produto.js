import express from "express";
import Produto from "../models/Produto.js";

const router = express.Router();

// GET /produtos - listar todos os produtos
router.get("/", async (req, res) => {
  try {
    const produtos = await Produto.find();

    if (!produtos || produtos.length === 0) {
      return res.status(404).json({ error: "Nenhum produto encontrado." });
    }
    res.json(produtos);
  } catch (error) {

    res.status(500).json(error.toString ? error.toString() : "Erro ao buscar produtos.");
    // res.status(500).json({ error: "Erro ao buscar produtos." });
  }
});

// GET /produtos/:nome - buscar produto pelo nome (case insensitive)
router.get("/:nome", async (req, res) => {
  try {
    const nome = req.params.nome;
    const produto = await Produto.findOne({ nome: new RegExp(`^${nome}$`, "i") }).exec();
    if (!produto) {
      return res.status(404).json({ error: "Produto não encontrado." });
    }
    res.json(produto);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar produto." });
  }
});

export default router;
