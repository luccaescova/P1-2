const mensagem: string = "Olá, TypeScript!";
console.log(mensagem);

// src/index.ts
import app from './app';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
