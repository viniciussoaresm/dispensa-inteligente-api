import express from "express";
import DespensaItem from "../models/despensaItem.js";
import authMiddleware from "../middlewares/auth.js"; // middleware JWT que seta req.user

const router = express.Router();

// Middleware para garantir que só acessa com token válido
router.use(authMiddleware);

// GET /dispensa - lista itens da despensa do usuário logado
router.get("/", async (req, res) => {
  try {
    const itens = await DespensaItem.find({ userId: req.user.uid }).exec();
    res.json(itens);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar despensa" });
  }
});

// POST /dispensa - adiciona produto à despensa do usuário logado
router.post("/", async (req, res) => {
  const { nome, quantidade, dataEntrada, validade, categoria, observacoes } = req.body;

  if (!nome || !quantidade) {
    return res.status(400).json({ error: "Nome e quantidade são obrigatórios" });
  }

  try {
    const novoItem = new DespensaItem({
      userId: req.user.uid,
      nome,
      quantidade,
      dataEntrada: dataEntrada ? new Date(dataEntrada) : new Date(),
      validade: validade ? new Date(validade) : undefined,
      categoria,
      observacoes,
    });

    await novoItem.save();
    res.status(201).json({ mensagem: "Item adicionado à despensa", item: novoItem });
  } catch (error) {
    res.status(500).json({ error: "Erro ao adicionar item" });
  }
});

// DELETE /dispensa/:id - remove item da despensa
router.delete("/:id", async (req, res) => {
  try {
    const item = await DespensaItem.findOneAndDelete({ _id: req.params.id, userId: req.user.uid });
    if (!item) {
      return res.status(404).json({ error: "Item não encontrado" });
    }
    res.json({ mensagem: "Item removido", item });
  } catch (error) {
    res.status(500).json({ error: "Erro ao remover item" });
  }
});

export default router;
