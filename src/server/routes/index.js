import express from 'express';
import applicationHandler from './applicationHandler';
import refreshHandler from './refreshHandler';
import searchLocationHandler from './searchLocationHandler';
const router = express.Router();

router.get('/', applicationHandler);
router.get('/refresh', refreshHandler);
router.get('/search', searchLocationHandler);

export default router;
