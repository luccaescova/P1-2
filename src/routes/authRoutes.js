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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const AuthRoutes = (0, express_1.Router)();
/**
 * Serviço para autenticação de usuários (Sign In)
 */
AuthRoutes.post("/signIn", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Valida se o email e a senha foram fornecidos
        if (!email || !password) {
            return res.status(400).json({ message: "Email e senha são obrigatórios." });
        }
        // Verifica se o usuário existe
        const user = yield User_1.User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: "Credenciais inválidas." });
        }
        // Valida a senha
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Credenciais inválidas." });
        }
        // Gera o token JWT
        const token = jsonwebtoken_1.default.sign({ id: user.id, isModerator: user.isModerator }, process.env.JWT_SECRET || "chave_secreta", { expiresIn: "1h" });
        res.status(200).json({
            message: "Login realizado com sucesso.",
            token,
        });
    }
    catch (error) {
        console.error("Erro ao realizar login:", error); // Log do erro para depuração
        res.status(500).json({ message: "Erro ao realizar login.", error });
    }
}));
exports.default = AuthRoutes;
