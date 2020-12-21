import express from 'express';
const router = express.Router();
import { root } from '../controller/index.controller.js';

router.get('/', root)
export default router;