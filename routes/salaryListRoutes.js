const express = require("express");
const router = express.Router();
const { verifyToken, verifyRole } = require("../middleware/authMiddleware");
const roleRequired = 1;
const salaryListController = require("../controllers/salaryListController");

router.get(
  "/salaryList/:id([0-9]+)",
  verifyToken,
  salaryListController.getSalaryListById
);
router.post(
  "/salaryList",
  verifyToken,
  verifyRole(roleRequired),
  salaryListController.createSalaryList
);
router.get(
  "/salaryList/all",
  verifyToken,
  salaryListController.getAllSalaryLists
);
router.put(
  "/salaryList/:id",
  verifyToken,
  verifyRole(roleRequired),
  salaryListController.updateSalaryList
);
router.delete(
  "/salaryList/:id",
  verifyToken,
  verifyRole(roleRequired),
  salaryListController.deleteSalaryList
);
router.get(
  "/salaryList/search",
  verifyToken,
  salaryListController.searchSalaryList
);
router.get(
  "/salaryList/sort",
  verifyToken,
  salaryListController.sortSalaryLists
);

module.exports = router;
