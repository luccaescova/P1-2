import express from "express";
import AuthRoutes from "./routes/authRoutes";
import eventRoutes from "./routes/eventsRoutes";
import betRoutes from "./routes/betRoutes";
import walletRoutes from "./routes/walletRoutes";
import createTables from "./utils/setupDB";
import { AppDataSource } from "./config/appDataSource";

const app = express();
app.use(express.json());

// Rotas
app.use("/auth", AuthRoutes);
app.use("/events", eventRoutes);
app.use("/bets", betRoutes);
app.use("/wallet", walletRoutes);

// Inicializar o banco de dados antes de iniciar o servidor
AppDataSource.initialize()
    .then(() => {
        console.log("Banco de dados conectado!");

        // Executar o setup do banco (se necessário)
        createTables();

        // Iniciar o servidor após a conexão com o banco de dados
        const PORT = 3000;
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Erro ao conectar ao banco de dados:", error);
    });
