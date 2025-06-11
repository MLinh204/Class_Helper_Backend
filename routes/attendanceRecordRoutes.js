const express = require("express");
const router = express.Router();
const { verifyRole, verifyToken } = require("../middleware/authMiddleware");
const roleRequired = 1;
const attendanceRecordController = require("../controllers/attendanceRecordController");

router.get(
  "/attendanceRecord/:id",
  verifyToken,
  verifyRole(roleRequired),
  attendanceRecordController.getAttendanceRecordById
);
router.post(
  "/attendanceRecord/list/:attendanceListId/student/:studentId",
  verifyToken,
  verifyRole(roleRequired),
  attendanceRecordController.createAttendanceRecord
);
router.get(
  "/attendanceRecord/list/:attendanceListId",
  verifyToken,
  attendanceRecordController.getAttendanceRecordsByAttendanceListId
);
router.get(
  "/attendanceRecord/student/:id",
  verifyToken,
  verifyRole(roleRequired),
  attendanceRecordController.getAttendanceRecordsByStudentId
);
router.put(
  "/attendanceRecord/record/:id",
  verifyToken,
  attendanceRecordController.updateAttended
);
router.delete(
  "/attendanceRecord/:id",
  verifyToken,
  verifyRole(roleRequired),
  attendanceRecordController.deleteAttendanceRecord
);

module.exports = router;
