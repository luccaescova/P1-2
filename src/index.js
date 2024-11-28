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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const eventsRoutes_1 = __importDefault(require("./routes/eventsRoutes"));
const betRoutes_1 = __importDefault(require("./routes/betRoutes"));
const walletRoutes_1 = __importDefault(require("./routes/walletRoutes"));
const appDataSource_1 = require("./config/appDataSource");
const express_2 = require("express");
const cors_1 = __importDefault(require("cors"));
const passport_1 = __importDefault(require("passport"));
const User_1 = require("./models/User");
//const port = 3001;
const server = (0, express_1.default)();
const routes = (0, express_2.Router)();
server.use((0, cors_1.default)());
routes.get('/', (req, res) => {
    res.statusCode = 403;
    res.send('Pagina ou serviço Inexistente');
});
routes.post('/login', User_1.ProfileHandler.loginHandler);
routes.post('/getWalletBalanse', passport_1.default.authenticate('jwt', { session: false }), User_1.ProfileHandler.getWalletBalance);
server.use(routes);
/*server.listen(port, ()=>{
    console.log(`Server is running on: ${port}`)
}
)*/
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Rotas
app.use("/auth", authRoutes_1.default);
app.use("/events", eventsRoutes_1.default);
app.use("/bets", betRoutes_1.default);
app.use("/wallet", walletRoutes_1.default);
// Inicializar o banco de dados antes de iniciar o servidor
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const PORT = 3001; // Usar variável de ambiente para a porta
        // Inicializar o banco de dados
        yield appDataSource_1.AppDataSource.initialize();
        console.log("Banco de dados conectado!");
        // Iniciar o servidor
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    }
    catch (error) {
        console.error("Erro ao conectar ao banco de dados:", error);
        process.exit(1); // Sair do processo em caso de erro
    }
});
// Iniciar o servidor
startServer();
