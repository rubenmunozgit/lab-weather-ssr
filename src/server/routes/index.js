import express from 'express';
import applicationHandler from './applicationHandler';
import refreshHandler from './refreshHandler';
const router = express.Router();

router.get('/', applicationHandler);
router.get('/refresh', refreshHandler);

export default router;
