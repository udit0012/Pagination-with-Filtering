import express from 'express'
import { getUsers,getUser,addUser,updateUser,deleteUser, getAllUniqueValue } from '../controllers/User.js';

const router = express.Router();

router.get('/users',getUsers)
router.get('/users/:id',getUser)
router.post('/users',addUser)
router.put('/users/:id',updateUser)
router.delete('/users/:id',deleteUser)
router.get('/uniqueValues',getAllUniqueValue)

export default router