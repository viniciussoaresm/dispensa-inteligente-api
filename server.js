
import express from "express";
import mongoose from "mongoose";
import admin from "firebase-admin";
import dotenv from "dotenv";
import produtoRoutes from "./routes/produto.js";
import dispensaRoutes from "./routes/despensa.js";
import categoriasRoutes from "./routes/categorias.js";
import usuarioRoutes from "./routes/usuario.js";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

const serviceAccount = require("./serviceAccountKey.json");


dotenv.config();

const app = express();
app.use(express.json());

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

mongoose.connect(process.env.MONGODB_URI)
  .catch((err) => console.error("Erro MongoDB:", err));

app.use("/produtos", produtoRoutes);
app.use("/categorias", categoriasRoutes);
app.use("/dispensa", dispensaRoutes);
app.use("/usuario", usuarioRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
