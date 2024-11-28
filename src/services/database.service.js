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
exports.executeQuery = void 0;
const database_1 = require("../config/database");
const executeQuery = (query_1, ...args_1) => __awaiter(void 0, [query_1, ...args_1], void 0, function* (query, params = []) {
    try {
        // Inicializa a conexão com o banco de dados
        const connection = yield database_1.AppDataSource.initialize();
        const result = yield connection.query(query, params);
        yield connection.destroy(); // Feche a conexão após a consulta
        return result; // Retorne o resultado da consulta
    }
    catch (error) {
        console.error("Erro ao executar consulta:", error);
        throw error;
    }
});
exports.executeQuery = executeQuery;
/*import { AppDataSource } from "../config/database";

export const executeQuery = async (query: string, params: any[] = []) => {
    try {
        const connection = await AppDataSource();
        const result = await connection.execute(query, params, { autoCommit: true });
        await connection.close();
        return result.rows;
    } catch (error) {
        console.error("Erro ao executar consulta:", error);
        throw error;
    }
};*/
