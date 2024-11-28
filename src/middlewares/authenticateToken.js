"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateToken = (req, res, next) => {
    var _a;
    const token = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1]; // Obtém o token do cabeçalho de autorização
    if (!token) {
        return res.status(401).json({ message: 'Acesso negado. Token não fornecido.' });
    }
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'chave_secreta', (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido.' });
        }
        // Verifica se o user é um objeto e contém a propriedade id
        if (typeof user === 'object' && user !== null && 'id' in user) {
            req.body.userId = user.id; // Adiciona o id do usuário ao corpo da requisição
            next(); // Chama o próximo middleware ou rota
        }
        else {
            return res.status(403).json({ message: 'Token inválido. Usuário não encontrado.' });
        }
    });
};
exports.default = authenticateToken;
