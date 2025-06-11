const expresss = require("express");
const router = expresss.Router();
const { verifyToken, verifyRole } = require("../middleware/authMiddleware");
const teacherController = require("../controllers/teacherController");
const roleRequired = 1;

router.get(
  "/teacher/:id([0-9]+)",
  verifyToken,
  teacherController.getTeacherById
);
router.post("/teacher", teacherController.createTeacher);
router.put(
  "/teacher/:id",
  verifyToken,
  verifyRole(roleRequired),
  teacherController.updateTeacher
);
router.delete(
  "/teacher/:id",
  verifyToken,
  verifyRole(roleRequired),
  teacherController.deleteTeacher
);
router.get("/teacher/all", verifyToken, teacherController.getAllTeachers);
router.get(
  "/teacher/current",
  verifyToken,
  teacherController.getTeacherByCurrentUser
);
router.get("/teacher/sort", verifyToken, teacherController.searchTeacher);
router.get("/teacher/search", verifyToken, teacherController.sortTeacherBy);

module.exports = router;
