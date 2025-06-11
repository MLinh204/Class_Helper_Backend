const express = require("express");
const router = express.Router();
const { verifyToken, verifyRole } = require("../middleware/authMiddleware");
const roleRequired = 1;
const attendanceListController = require("../controllers/attendanceListController");

router.get(
  "/attendanceList/:id([0-9]+)",
  verifyToken,
  attendanceListController.getAttendanceListById
);
router.post(
  "/attendanceList",
  verifyToken,
  verifyRole(roleRequired),
  attendanceListController.createAttendanceList
);
router.get(
  "/attendanceList/all",
  verifyToken,
  attendanceListController.getAttendanceLists
);
router.get(
  "/attendanceList/teacher/:id",
  verifyToken,
  verifyRole(roleRequired),
  attendanceListController.getAttendanceListsByTeacherId
);
router.put(
  "/attendanceList/:id",
  verifyToken,
  verifyRole(roleRequired),
  attendanceListController.updateAttendanceList
);
router.delete(
  "/attendanceList/:id",
  verifyToken,
  verifyRole(roleRequired),
  attendanceListController.deleteAttendanceList
);
router.get(
  "/attendanceList/search",
  verifyToken,
  verifyRole(roleRequired),
  attendanceListController.searchAttendanceList
);
router.get(
  "/attendanceList/sort",
  verifyToken,
  verifyRole(roleRequired),
  attendanceListController.sortAttendanceLists
);

module.exports = router;
