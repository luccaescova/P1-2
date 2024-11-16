import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

const router = Router();

// Rota de login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Verifica se o usuário existe
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: "Email ou senha inválidos." });
        }

        // Valida a senha
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Email ou senha inválidos." });
        }

        // Gera o token JWT
        const token = jwt.sign(
            { id: user.id, isModerator: user.isModerator },
            "chave_secreta", // Use uma variável de ambiente para a chave secreta
            { expiresIn: "1h" }
        );

        return res.status(200).json({ token, message: "Login realizado com sucesso!" });
    } catch (error) {
        return res.status(500).json({ message: "Erro no servidor.", error });
    }
});

export default router;
