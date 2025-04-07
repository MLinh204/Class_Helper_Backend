const express = require('express');
const router = express.Router();
const {verifyToken, verifyRole} = require('../middleware/authMiddleware');
const roleRequired = 1;
const vocabController = require('../controllers/vocabController');

router.get('/vocab/:id([0-9]+)', verifyToken, vocabController.getVocabById);
router.post('/vocab/list/:list_id', verifyToken, vocabController.createVocab);
router.get('/vocab/list/:id', verifyToken, vocabController.getVocabByListId);
router.put('/vocab/:id', verifyToken, vocabController.updateVocab);
router.delete('/vocab/:id', verifyToken, verifyRole(roleRequired), vocabController.deleteVocab);
router.get('/vocab/list/:list_id/search', verifyToken, vocabController.searchVocab);
router.get('/vocab/list/:list_id/sort', verifyToken, vocabController.sortVocabsBy);

module.exports = router;
