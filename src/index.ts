import express from "express";
import AuthRoutes from "./routes/authRoutes";
import eventRoutes from "./routes/eventsRoutes";
import betRoutes from "./routes/betRoutes";
import walletRoutes from "./routes/walletRoutes";
import { AppDataSource } from "./config/appDataSource";

const app = express();
app.use(express.json());

// Rotas
app.use("/auth", AuthRoutes);
app.use("/events", eventRoutes);
app.use("/bets", betRoutes);
app.use("/wallet", walletRoutes);

// Inicializar o banco de dados antes de iniciar o servidor
const startServer = async () => {
    try {
        const PORT = 3000; // Usar variável de ambiente para a porta

        // Inicializar o banco de dados
        await AppDataSource.initialize();
        console.log("Banco de dados conectado!");

        // Iniciar o servidor
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    } catch (error) {
        console.error("Erro ao conectar ao banco de dados:", error);
        process.exit(1); // Sair do processo em caso de erro
    }
};

// Iniciar o servidor
startServer();