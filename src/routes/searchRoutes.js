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
const typeorm_1 = require("typeorm");
const Events_1 = require("../models/Events");
const router = (0, express_1.Router)();
/**
 * Buscar eventos por critérios
 */
router.get("/searchEvent", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { query, status, startDate, endDate } = req.query;
        // Condições de busca dinâmicas
        const conditions = {};
        if (query) {
            conditions.title = (0, typeorm_1.Like)(`%${query}%`); // Busca por palavra-chave no título
        }
        if (status) {
            conditions.status = status; // Status: pending, approved, finished, etc.
        }
        if (startDate) {
            conditions.startDate = { $gte: new Date(startDate) };
        }
        if (endDate) {
            conditions.endDate = { $lte: new Date(endDate) };
        }
        // Busca no banco de dados com as condições
        const events = yield Events_1.Event.find({ where: conditions });
        if (events.length === 0) {
            return res.status(404).json({ message: "Nenhum evento encontrado." });
        }
        res.status(200).json(events);
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao buscar eventos.", error });
    }
}));
exports.default = router;
