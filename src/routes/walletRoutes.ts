import { Router, Request, Response } from "express";
import { User } from "../models/User";
import { WalletTransaction } from "../models/WalletTransaction";
//import { authenticateToken } from "../middlewares/authenticateToken";
const router = Router();
/**
 * Adicionar fundos à carteira
 */
router.post("/addFunds", async (req: Request, res: Response): Promise<any> => {
    try {
        const { amount } = req.body;

        if (amount <= 0) {
            return res.status(400).json({ message: "O valor deve ser maior que zero." });
        }

        const userIdNumber = req.body.userId; // Obtém o userId do middleware
        const user = await User.findOne({ where: { id: userIdNumber } });
        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }

        user.walletBalance += amount;
        await user.save();

        const transaction = new WalletTransaction();
        transaction.user = user;
        transaction.amount = amount;
        transaction.type = "deposit";
        await transaction.save();

        return res.status(200).json({ message: "Fundos adicionados com sucesso.", balance: user.walletBalance });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erro ao adicionar fundos.", error });
    }
});

/**
 * Sacar fundos da carteira
 */
router.post("/withdrawFunds", async (req: Request, res: Response): Promise<any> => {
    try {
        const { userId, amount, bankDetails } = req.body;

        if (amount <= 0) {
            return res.status(400).json({ message: "O valor deve ser maior que zero." });
        }

        const user = await User.findOne({ where: { id: userId } });
        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }

        if (user.walletBalance < amount) {
            return res.status(400).json({ message: "Saldo insuficiente." });
        }

        let fee = 0;
        if (amount <= 100) {
            fee = amount * 0.04;
        } else if (amount <= 1000) {
            fee = amount * 0.03;
        } else if (amount <= 5000) {
            fee = amount * 0.02;
        } else if (amount <= 100000) {
            fee = amount * 0.01;
        }
        const finalAmount = amount - fee;

        user.walletBalance -= amount;
        await user.save();

        const transaction = new WalletTransaction();
        transaction.user = user;
        transaction.amount = -amount;
        transaction.type = "withdraw";
        transaction.details = bankDetails;
        await transaction.save();

        res.status(200).json({
            message: " Saque realizado com sucesso.",
            balance: user.walletBalance,
            fee,
            finalAmount,
        });
    } catch (error) {
        console.error(error); // Log do erro
        res.status(500).json({ message: "Erro ao realizar saque.", error });
    }
});

/**
 * Consultar saldo e histórico
 */
router.get("/balance", async (req: Request, res: Response): Promise<any> => {
    try {
        const { userId } = req.query;

        if (!userId || isNaN(Number(userId))) {
            return res.status(400).json({ message: "userId é obrigatório e deve ser um número." });
        }

        const user = await User.findOne({ where: { id: Number(userId) } });
        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }

        // Agora que temos a instância do usuário, podemos usá-la na consulta
        const transactions = await WalletTransaction.find({ where: { user } });

        res.status(200).json({
            balance: user.walletBalance,
            transactions,
        });
    } catch (error) {
        console.error(error); // Log do erro
        res.status(500).json({ message: "Erro ao consultar saldo.", error });
    }
});


export default router;