
import admin from "firebase-admin";

export const verificarToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ erro: "Token não fornecido." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.usuario = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ erro: "Token inválido." });
  }
};
