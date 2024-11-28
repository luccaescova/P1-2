"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const User_1 = require("../models/User");
const Events_1 = require("../models/Events");
const Bets_1 = require("../models/Bets");
const WalletTransaction_1 = require("../models/WalletTransaction");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "oracle",
    host: "localhost",
    port: 1521,
    username: "betting_platform",
    password: "password",
    database: "XEPDB1",
    synchronize: true, // Cria as tabelas automaticamente
    logging: true,
    entities: [User_1.User, Events_1.Event, Bets_1.Bet, WalletTransaction_1.WalletTransaction],
});
