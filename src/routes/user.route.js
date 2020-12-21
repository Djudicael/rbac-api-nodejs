import express from 'express';
const router = express.Router();
import { profile } from '../controller/user.controller.js';

router.get('/profile', profile);

export default router;