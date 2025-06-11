const expresss = require("express");
const router = expresss.Router();
const { verifyToken, verifyRole } = require("../middleware/authMiddleware");
const studentController = require("../controllers/studentController");
const roleRequired = 1;

router.get(
  "/student/:id([0-9]+)",
  verifyToken,
  studentController.getStudentById
);
router.post("/student", verifyToken, studentController.createStudent);
router.put("/student/:id", verifyToken, studentController.updateStudent);
router.delete(
  "/student/:id",
  verifyToken,
  verifyRole(roleRequired),
  studentController.deleteStudent
);
router.get("/student/all", verifyToken, studentController.getAllStudents);
router.get(
  "/student/user/:userId",
  verifyToken,
  studentController.getStudentByUserId
);
router.get("/student/sort", verifyToken, studentController.sortStudentsBy);
router.get("/student/search", verifyToken, studentController.searchStudentsBy);
router.put(
  "/student/updatePoint/:id",
  verifyToken,
  verifyRole(roleRequired),
  studentController.addPoint
);
router.put(
  "/student/updateHeart/:id",
  verifyToken,
  verifyRole(roleRequired),
  studentController.modifyHeart
);
router.put(
  "/student/updateLevel/:id",
  verifyToken,
  verifyRole(roleRequired),
  studentController.modifyLevel
);

module.exports = router;
