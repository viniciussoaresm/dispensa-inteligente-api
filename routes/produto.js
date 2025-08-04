
import express from "express";
import { produtos, categorias } from "../data/base_produtos.json" assert { type: "json" };

const router = express.Router();

// Busca produto por nome (case insensitive)
router.get('/:nome', (req, res) => {
  const nomeBusca = req.params.nome.toLowerCase();
  const produto = produtos.find(p => p.nome.toLowerCase() === nomeBusca);
  if (produto) {
    res.json(produto);
  } else {
    res.status(404).json({ mensagem: "Produto não encontrado." });
  }
});

// Retorna todas as categorias
router.get('/categorias', (req, res) => {
  res.json(categorias);
});

export default router;
