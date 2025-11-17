import express from 'express';
import { getAllSummaries, createSummary, updateSummary } from '../controller/summary.js';

const router = express.Router();

router.get('/', getAllSummaries);
// router.get('/:id', getSummaryById);
router.post('/create', createSummary);
router.put('update/:id', updateSummary);
// router.delete('delete/:id', deleteSummary);

export default router;