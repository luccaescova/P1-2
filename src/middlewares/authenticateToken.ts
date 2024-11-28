import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
    id: string; // ou number, dependendo de como você está definindo o ID do usuário
}

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Obtém o token do cabeçalho de autorização

    if (!token) {
        return res.status(401).json({ message: 'Acesso negado. Token não fornecido.' });
    }

    jwt.verify(token, process.env.JWT_SECRET || 'chave_secreta', (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido.' });
        }

        // Verifica se o user é um objeto e contém a propriedade id
        if (typeof user === 'object' && user !== null && 'id' in user) {
            req.body.userId = user.id; // Adiciona o id do usuário ao corpo da requisição
            next(); // Chama o próximo middleware ou rota
        } else {
            return res.status(403).json({ message: 'Token inválido. Usuário não encontrado.' });
        }
    });
};

export default authenticateToken;