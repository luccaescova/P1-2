import express from "express";
import authRoutes from "./routes/auth.routes";
import eventRoutes from "./routes/event.routes";
import betRoutes from "./routes/bet.routes";
import walletRoutes from "./routes/wallet.routes";

const app = express();
app.use(express.json());

// Rotas
app.use("/auth", authRoutes);
app.use("/events", eventRoutes);
app.use("/bets", betRoutes);
app.use("/wallet", walletRoutes);

// Inicialização do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
