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
const Events_1 = require("../models/Events");
const User_1 = require("../models/User");
const router = (0, express_1.Router)();
/**
 * Criar um novo evento
 */
router.post("/addNewEvent", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, title, description, betAmount, startDate, endDate } = req.body;
        // Verifica se o usuário existe
        const user = yield User_1.User.findOne({ where: { id: userId } });
        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }
        // Cria o evento
        const event = new Events_1.Event();
        event.title = title;
        event.description = description;
        event.betAmount = betAmount;
        event.startDate = new Date(startDate);
        event.endDate = new Date(endDate);
        event.creator = user;
        event.status = "pending"; // Status inicial: aguardando aprovação
        yield event.save();
        res.status(201).json({ message: "Evento criado com sucesso.", event });
    }
    catch (error) {
        console.error("Erro ao criar evento:", error);
        res.status(500).json({ message: "Erro ao criar evento.", error });
    }
}));
/**
 * Listar eventos por status
 */
router.get("/getEvents", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status } = req.query; // pending, approved, rejected
        const events = yield Events_1.Event.find({ where: { status: "string" } });
        if (events.length === 0) {
            return res.status(404).json({ message: "Nenhum evento encontrado." });
        }
        res.status(200).json(events);
    }
    catch (error) {
        console.error("Erro ao buscar eventos:", error);
        res.status(500).json({ message: "Erro ao buscar eventos.", error });
    }
}));
/**
 * Aprovar ou Reprovar um evento
 */
router.patch("/evaluateEvent", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { eventId, isApproved, moderatorId } = req.body;
        // Verifica se o moderador existe
        const moderator = yield User_1.User.findOne({ where: { id: moderatorId, isModerator: true } });
        if (!moderator) {
            return res.status(403).json({ message: "Acesso negado. Usuário não é moderador." });
        }
        // Busca o evento
        const event = yield Events_1.Event.findOne({ where: { id: eventId } });
        if (!event) {
            return res.status(404).json({ message: "Evento não encontrado." });
        }
        // Atualiza o status do evento
        event.status = isApproved ? "approved" : "rejected";
        yield event.save();
        res.status(200).json({ message: `Evento ${isApproved ? "aprovado" : "reprovado"} com sucesso.` });
    }
    catch (error) {
        console.error("Erro ao avaliar evento:", error);
        res.status(500).json({ message: "Erro ao avaliar evento.", error });
    }
}));
/**
 * Excluir um evento
 */
router.delete("/deleteEvent", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { eventId, userId } = req.body;
        // Verifica se o usuário existe
        const user = yield User_1.User.findOne({ where: { id: userId } });
        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }
        // Verifica se o evento pertence ao usuário
        const event = yield Events_1.Event.findOne({ where: { id: eventId, creator: user } });
        if (!event) {
            return res.status(404).json({ message: "Evento não encontrado ou acesso negado." });
        }
        // Verifica se o evento já foi aprovado ou recebeu apostas
        if (event.status !== "pending") {
            return res.status(400).json({ message: "Não é possível excluir eventos aprovados ou com apostas." });
        }
        // Exclui logicamente o evento (alterando status para 'deleted')
        event.status = "deleted";
        yield event.save();
        res.status(200).json({ message: "Evento excluído com sucesso." });
    }
    catch (error) {
        console.error("Erro ao excluir evento:", error);
        res.status(500).json({ message: "Erro ao excluir evento.", error });
    }
}));
exports.default = router;
