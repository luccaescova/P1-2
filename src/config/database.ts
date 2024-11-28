import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../models/User";
import { Event } from "../models/Events";
import { Bet } from "../models/Bets";
import { WalletTransaction } from "../models/WalletTransaction";

export const AppDataSource = new DataSource({
    type: "oracle",
    host: "localhost",
    port: 1521,
    username: "betting_platform",
    password: "password",
    database: "XEPDB1",
    synchronize: true,  // Cria as tabelas automaticamente
    logging: true,
    entities: [User , Event, Bet, WalletTransaction],
});