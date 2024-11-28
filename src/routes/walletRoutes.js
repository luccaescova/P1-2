"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = require("../models/User");
const WalletTransaction_1 = require("../models/WalletTransaction");
//import { authenticateToken } from "../middlewares/authenticateToken";
const router = (0, express_1.Router)();
/**
 * Adicionar fundos à carteira
 */
router.post("/addFunds", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { amount } = req.body;
        if (amount <= 0) {
            return res.status(400).json({ message: "O valor deve ser maior que zero." });
        }
        const userIdNumber = req.body.userId; // Obtém o userId do middleware
        const user = yield User_1.User.findOne({ where: { id: userIdNumber } });
        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }
        user.walletBalance += amount;
        yield user.save();
        const transaction = new WalletTransaction_1.WalletTransaction();
        transaction.user = user;
        transaction.amount = amount;
        transaction.type = "deposit";
        yield transaction.save();
        return res.status(200).json({ message: "Fundos adicionados com sucesso.", balance: user.walletBalance });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erro ao adicionar fundos.", error });
    }
}));
/**
 * Sacar fundos da carteira
 */
router.post("/withdrawFunds", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, amount, bankDetails } = req.body;
        if (amount <= 0) {
            return res.status(400).json({ message: "O valor deve ser maior que zero." });
        }
        const user = yield User_1.User.findOne({ where: { id: userId } });
        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }
        if (user.walletBalance < amount) {
            return res.status(400).json({ message: "Saldo insuficiente." });
        }
        let fee = 0;
        if (amount <= 100) {
            fee = amount * 0.04;
        }
        else if (amount <= 1000) {
            fee = amount * 0.03;
        }
        else if (amount <= 5000) {
            fee = amount * 0.02;
        }
        else if (amount <= 100000) {
            fee = amount * 0.01;
        }
        const finalAmount = amount - fee;
        user.walletBalance -= amount;
        yield user.save();
        const transaction = new WalletTransaction_1.WalletTransaction();
        transaction.user = user;
        transaction.amount = -amount;
        transaction.type = "withdraw";
        transaction.details = bankDetails;
        yield transaction.save();
        res.status(200).json({
            message: " Saque realizado com sucesso.",
            balance: user.walletBalance,
            fee,
            finalAmount,
        });
    }
    catch (error) {
        console.error(error); // Log do erro
        res.status(500).json({ message: "Erro ao realizar saque.", error });
    }
}));
/**
 * Consultar saldo e histórico
 */
router.get("/balance", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.query;
        if (!userId || isNaN(Number(userId))) {
            return res.status(400).json({ message: "userId é obrigatório e deve ser um número." });
        }
        const user = yield User_1.User.findOne({ where: { id: Number(userId) } });
        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }
        // Agora que temos a instância do usuário, podemos usá-la na consulta
        const transactions = yield WalletTransaction_1.WalletTransaction.find({ where: { user } });
        res.status(200).json({
            balance: user.walletBalance,
            transactions,
        });
    }
    catch (error) {
        console.error(error); // Log do erro
        res.status(500).json({ message: "Erro ao consultar saldo.", error });
    }
}));
exports.default = router;
