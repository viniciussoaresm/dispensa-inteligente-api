
import express from "express";
import mongoose from "mongoose";
import admin from "firebase-admin";
import dotenv from "dotenv";
import produtoRoutes from "./routes/produto.js";
import dispensaRoutes from "./routes/dispensa.js";
import categoriasRoutes from "./routes/categorias.js";
import usuarioRoutes from "./routes/usuario.js";
import serviceAccount from "./serviceAccountKey.json" assert { type: "json" };



dotenv.config();

const app = express();
app.use(express.json());

// Firebase Admin SDK init
// admin.initializeApp({
//   credential: admin.credential.cert({
//     projectId: process.env.FIREBASE_PROJECT_ID,
//     clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
//     privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
//   }),
// });
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
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

app.get("/test-firebase", async (req, res) => {
  try {
    const users = await admin.auth().listUsers(1);
    res.json({ usersCount: users.users.length });
  } catch (error) {
    console.error("Erro Firebase:", error);
    res.status(500).json({ error: error.message });
  }
});
