import oracledb from "oracledb";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../models/User";
import { Event } from "../models/Events";
import { Bet } from "../models/Bets";
import { WalletTransaction } from "../models/WalletTransaction";

export const AppDataSource = new DataSource({
    type: "oracle", // Tipo de banco
    host: "localhost", // Endereço do servidor
    port: 1521, // Porta padrão do Oracle
    username: "betting_platform", // Usuário do banco
    password: "password", // Senha do banco
    database: "XEPDB1", // Serviço ou SID do banco
    synchronize: true, // Cria as tabelas automaticamente (use com cuidado em produção)
    logging: true, // Log de queries no console
    entities: [User, Event, Bet, WalletTransaction], // Modelos registrados
});
