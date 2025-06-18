const express = require("express");
const router = express.Router();
const { verifyRole, verifyToken } = require("../middleware/authMiddleware");
const roleRequired = 1;
const salaryRecordController = require("../controllers/salaryRecordController");
router.get(
  "/salaryRecord/:id",
  verifyToken,
  verifyRole(roleRequired),
  salaryRecordController.getSalaryRecordById
);
router.post(
  "/salaryRecord/list/:salaryListId/student/:studentId",
  verifyToken,
  verifyRole(roleRequired),
  salaryRecordController.createSalaryRecord
);
router.get(
  "/salaryRecord/list/:salaryListId",
  verifyToken,
  salaryRecordController.getSalaryRecordsBySalaryListId
);
router.get(
  "/salaryRecord/student/:id",
  verifyToken,
  verifyRole(roleRequired),
  salaryRecordController.getSalaryRecordsByStudentId
);
router.delete(
  "/salaryRecord/:id",
  verifyToken,
  verifyRole(roleRequired),
  salaryRecordController.deleteSalaryRecord
);
router.get(
  "/salaryRecord/search",
  verifyToken,
  verifyRole(roleRequired),
  salaryRecordController.searchSalaryRecord
);
router.get(
  "/salaryRecord/sort",
  verifyToken,
  verifyRole(roleRequired),
  salaryRecordController.sortSalaryRecords
);
router.put(
  "/salaryRecord/paymentStatus/record/:id",
  verifyToken,
  salaryRecordController.updatePaymentStatus
);
module.exports = router;
