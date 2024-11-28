"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const User_1 = require("../models/User");
const WalletTransaction_1 = require("../models/WalletTransaction");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "oracle", // Tipo do banco de dados
    host: "BD-ACD", // Endereço do servidor
    port: 1521, // Porta do Oracle
    username: "BD130824246", // Usuário do banco
    password: "Ireqc9", // Senha do banco
    database: "XEPDB1", // Nome do banco
    entities: [User_1.User, WalletTransaction_1.WalletTransaction], // Modelos TypeORM
    synchronize: true, // Sincroniza modelos com o banco (use com cuidado em produção)
});
