import express from 'express';
const router = express.Router();
import { login, register, loginPost, registerPost, logout } from '../controller/auth.controller.js';

router.get('/login', login);
router.post('/login', loginPost);
router.get('/register', register);
router.post('/register', registerPost);
router.get('/logout', logout);

export default router;