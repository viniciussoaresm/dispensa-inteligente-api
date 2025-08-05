import admin from "firebase-admin";
import axios from "axios";
import express from "express";

const router = express.Router();


router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ mensagem: "Email e senha obrigatórios" });

  try {
    const response = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`,
      {
        email,
        password,
        returnSecureToken: true,
      }
    );

    res.status(200).json({
      mensagem: "Login bem-sucedido",
      token: response.data.idToken, // token JWT para usar como Bearer
      refreshToken: response.data.refreshToken,
      uid: response.data.localId,
    });
  } catch (erro) {
    res.status(401).json({
      mensagem: "Falha no login",
      erro: erro.response?.data?.error || erro.message,
    });
  }
});

router.post("/refresh", async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ mensagem: "Refresh token obrigatório" });
  }

  try {
    const response = await axios.post(
      `https://securetoken.googleapis.com/v1/token?key=${FIREBASE_API_KEY}`,
      new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    res.status(200).json({
      mensagem: "Token renovado com sucesso",
      token: response.data.id_token,
      refreshToken: response.data.refresh_token,
      expiresIn: response.data.expires_in,
      uid: response.data.user_id,
    });
  } catch (erro) {
    res.status(401).json({
      mensagem: "Erro ao renovar token",
      erro: erro.response?.data?.error || erro.message,
    });
  }
});

// Cadastro de novo usuário
router.post("/cadastro", async (req, res) => {
  const { email, password, displayName } = req.body;

  if (!email || !password) {
    return res.status(400).json({ mensagem: "Email e senha são obrigatórios." });
  }

  try {
    const user = await admin.auth().createUser({
      email,
      password,
      displayName: displayName || "",
    });

    res.status(201).json({
      mensagem: "Usuário criado com sucesso.",
      uid: user.uid,
      email: user.email,
    });
  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro ao criar usuário.",
      erro: erro.message,
    });
  }
});

export default router;