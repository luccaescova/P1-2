// src/routes/authRoutes.ts
import express from 'express';
import { login } from '../controllers/AuthController';

const router = express.Router();

// Rota de login
router.post('/login', login);

export default router;
