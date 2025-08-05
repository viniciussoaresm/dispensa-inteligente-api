import express from "express";
import Categoria from "../models/Categoria.js";

const router = express.Router();

// GET /categorias - listar todas as categorias
router.get("/", async (req, res) => {
  try {
    const categorias = await Categoria.find().exec();
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar categorias." });
  }
});

// POST /categorias - cadastrar nova categoria
router.post("/", async (req, res) => {
  const { nome, descricao } = req.body;

  if (!nome) {
    return res.status(400).json({ error: "Nome da categoria é obrigatório" });
  }

  try {
    const existente = await Categoria.findOne({ nome: new RegExp(`^${nome}$`, "i") }).exec();
    if (existente) {
      return res.status(409).json({ error: "Categoria já existe" });
    }

    const categoria = new Categoria({ nome, descricao });
    await categoria.save();

    res.status(201).json({ mensagem: "Categoria cadastrada com sucesso", categoria });
  } catch (error) {
    res.status(500).json({ error: "Erro ao cadastrar categoria" });
  }
});

export default router;
