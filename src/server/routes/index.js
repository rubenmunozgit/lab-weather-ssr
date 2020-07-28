import express from 'express';
import applicationHandler from './applicationHandler';
const router = express.Router();

router.get('/', applicationHandler);

export default router;