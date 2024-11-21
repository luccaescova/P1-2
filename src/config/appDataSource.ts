import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../models/User";
import { WalletTransaction } from "../models/WalletTransaction";

export const AppDataSource = new DataSource({
    type: "oracle", // Tipo do banco de dados
    host: "BD-ACD", // Endereço do servidor
    port: 1521, // Porta do Oracle
    username: "BD130824246", // Usuário do banco
    password: "Ireqc9", // Senha do banco
    database: "XEPDB1", // Nome do banco
    entities: [User, WalletTransaction], // Modelos TypeORM
    synchronize: true, // Sincroniza modelos com o banco (use com cuidado em produção)
});
