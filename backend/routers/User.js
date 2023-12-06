import express from 'express'
import { getUsers, getAllUniqueValue } from '../controllers/User.js';

const router = express.Router();

router.get('/users',getUsers)
router.get('/uniqueValues',getAllUniqueValue)

export default router