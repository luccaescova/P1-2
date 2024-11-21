import { AppDataSource } from "../config/appDataSource";

export const runSQL = async (query: string, params: any[] = []) => {
    try {
        const connection = await AppDataSource.initialize();
        const result = await connection.query(query, params);
        console.log("Consulta executada com sucesso:", result);
        await connection.destroy();
    } catch (error) {
        console.error("Erro ao executar SQL:", error);
    }
};
