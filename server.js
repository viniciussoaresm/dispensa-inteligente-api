
import express from "express";
import mongoose from "mongoose";
import admin from "firebase-admin";
import dotenv from "dotenv";
import produtoRoutes from "./routes/produto.js";
import dispensaRoutes from "./routes/dispensa.js";
import categoriasRoutes from "./routes/categorias.js";
import usuarioRoutes from "./routes/usuario.js";



dotenv.config();

const app = express();
app.use(express.json());

// Firebase Admin SDK init
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\n/g, '\n'),
  }),
});

// Conexão MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .catch((err) => console.error("Erro MongoDB:", err));

app.use("/produtos", produtoRoutes);
app.use("/categorias", categoriasRoutes);
app.use("/dispensa", dispensaRoutes);
app.use("/usuario", usuarioRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
