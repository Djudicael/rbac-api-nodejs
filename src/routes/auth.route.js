import express from 'express';
const router = express.Router();
import { login, register, loginPost, registerPost } from '../controller/auth.controller.js';

router.get('/login', login);
router.post('/login', loginPost);
router.get('/register', register);
router.post('/register', registerPost);

export default router;