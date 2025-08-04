// routes/categorias.js
import express from "express";
import Categoria from "../models/Categoria.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const categorias = await Categoria.find().exec();
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar categorias." });
  }
});

export default router;
