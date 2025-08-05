import express from "express";
import Produto from "../models/produto.js";

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

router.get('/recomendados/:search', async (req, res) => {
  try {
    const search = req.params.search;

    if (!search) {
      return res.status(400).json({ erro: 'Parâmetro "search" é obrigatório' });
    }

    const produtos = await Produto.find({
      nome: new RegExp(search, 'i'),
    }).limit(10); 

    res.json(produtos);
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao buscar recomendações' });
  }
});

export default router;
