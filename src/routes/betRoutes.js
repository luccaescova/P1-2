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
const Bets_1 = require("../models/Bets");
const Events_1 = require("../models/Events");
const User_1 = require("../models/User");
const typeorm_1 = require("typeorm");
const router = (0, express_1.Router)();
/**
 * Realizar uma aposta
 */
router.post("/betOnEvent", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, eventId, amount, prediction } = req.body;
        // Verifica se o usuário existe
        const user = yield User_1.User.findOne({ where: { id: userId } });
        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }
        // Verifica se o evento existe e está aprovado
        const event = yield Events_1.Event.findOne({ where: { id: eventId, status: "approved" } });
        if (!event) {
            return res.status(404).json({ message: "Evento não encontrado ou não está aprovado." });
        }
        // Verifica se o usuário tem saldo suficiente
        if (user.walletBalance < amount) {
            return res.status(400).json({ message: "Saldo insuficiente." });
        }
        // Cria a aposta
        const bet = new Bets_1.Bet();
        bet.user = user;
        bet.event = event;
        bet.amount = amount;
        bet.prediction = prediction; // True = "Sim", False = "Não"
        yield bet.save();
        // Deduz o saldo do usuário
        user.walletBalance -= amount;
        yield user.save();
        res.status(201).json({ message: "Aposta realizada com sucesso.", bet });
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao realizar aposta.", error });
    }
}));
/**
 * Encerrar evento e redistribuir ganhos
 */
router.post("/finishEvent", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { eventId, result } = req.body;
        // Verifica se o evento existe e está aprovado
        const event = yield Events_1.Event.findOne({ where: { id: eventId, status: "approved" }, relations: ["creator"] });
        if (!event) {
            return res.status(404).json({ message: "Evento não encontrado ou já foi encerrado." });
        }
        // Atualiza o resultado do evento
        event.result = result; // True = ocorreu, False = não ocorreu
        event.status = "finished";
        yield event.save();
        // Busca todas as apostas relacionadas ao evento
        const bets = yield (0, typeorm_1.getRepository)(Bets_1.Bet).find({ where: { event }, relations: ["user"] });
        // Calcula os ganhos e atualiza o saldo dos vencedores
        const totalPool = bets.reduce((sum, bet) => sum + bet.amount, 0);
        const winningPool = bets.filter((bet) => bet.prediction === result);
        const totalWinningAmount = winningPool.reduce((sum, bet) => sum + bet.amount, 0);
        if (winningPool.length > 0) {
            for (const bet of winningPool) {
                const user = bet.user;
                const proportion = bet.amount / totalWinningAmount;
                const winnings = totalPool * proportion;
                user.walletBalance += winnings;
                yield user.save();
            }
        }
        res.status(200).json({ message: "Evento encerrado e ganhos distribuídos com sucesso." });
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao encerrar evento.", error });
    }
}));
exports.default = router;
