import { Router, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

const router = Router();

/**
 * Serviço para autenticação de usuários (Sign In)
 */
router.post("/signIn", async (req: Request, res: Response): Promise<Response> => {
    try {
        const { email, password } = req.body;

        // Valida se o email e a senha foram fornecidos
        if (!email || !password) {
            return res.status(400).json({ message: "Email e senha são obrigatórios." });
        }

        // Verifica se o usuário existe
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: "Credenciais inválidas." });
        }

        // Valida a senha
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Credenciais inválidas." });
        }

        // Gera o token JWT
        const token = jwt.sign(
            { id: user.id, isModerator: user.isModerator },
            process.env.JWT_SECRET || "chave_secreta",
            { expiresIn: "1h" }
        );

        res.status(200).json({
            message: "Login realizado com sucesso.",
            token,
        });
    } catch (error) {
        console.error("Erro ao realizar login:", error); // Log do erro para depuração
        res.status(500).json({ message: "Erro ao realizar login.", error });
    }
});
export default router;

