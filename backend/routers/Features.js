import express from 'express'
import {getUserByPage } from '../controllers/Features.js';
import { filterByDomain } from '../controllers/Features.js';
import { filterByGender } from '../controllers/Features.js';
import { filterByAvailabilty } from '../controllers/Features.js';

const router = express.Router();

router.get('/pagination/:page',getUserByPage)
router.get('/filterByDomain/:domain',filterByDomain)
router.get('/filterByGender/:gender',filterByGender)
router.get('/filterByAvailabilty/:available',filterByAvailabilty)

export default router