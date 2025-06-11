const express = require("express");
const router = express.Router();
const { verifyToken, verifyRole } = require("../middleware/authMiddleware");
const roleRequired = 1;
const vocabListController = require("../controllers/vocabListController");

router.get(
  "/vocabList/:id([0-9]+)",
  verifyToken,
  vocabListController.getVocabListById
);
router.post(
  "/vocabList",
  verifyToken,
  verifyRole(roleRequired),
  vocabListController.createVocabList
);
router.get("/vocabList/all", verifyToken, vocabListController.getVocabLists);
router.put(
  "/vocabList/:id",
  verifyToken,
  verifyRole(roleRequired),
  vocabListController.updateVocabList
);
router.delete(
  "/vocabList/:id",
  verifyToken,
  verifyRole(roleRequired),
  vocabListController.deleteVocabList
);
router.get(
  "/vocabList/search",
  verifyToken,
  vocabListController.searchVocabList
);
router.get(
  "/vocabList/sort",
  verifyToken,
  vocabListController.sortVocabListsBy
);

module.exports = router;
