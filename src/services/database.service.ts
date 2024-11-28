import { AppDataSource } from "../config/database";

export const executeQuery = async (query: string, params: any[] = []) => {
    try {
        // Inicializa a conexão com o banco de dados
        const connection = await AppDataSource.initialize();
        const result = await connection.query(query, params);
        await connection.destroy(); // Feche a conexão após a consulta
        return result; // Retorne o resultado da consulta
    } catch (error) {
        console.error("Erro ao executar consulta:", error);
        throw error;
    }
};
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
