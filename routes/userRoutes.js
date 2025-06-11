const expresss = require("express");
const router = expresss.Router();
const userController = require("../controllers/userController");
const { verifyToken, verifyRole } = require("../middleware/authMiddleware");
const roleRequired = 1;

router.get("/user/:id([0-9]+)", verifyToken, userController.getUserById);
router.post(
  "/user",
  verifyToken,
  verifyRole(roleRequired),
  userController.createUser
);
router.put("/user/:id", verifyToken, userController.updateUser);
router.delete(
  "/user/:id",
  verifyToken,
  verifyRole(roleRequired),
  userController.deleteUser
);
router.put(
  "/user/:id/role",
  verifyToken,
  verifyRole(roleRequired),
  userController.updateUserRole
);
router.get("/user", verifyToken, userController.getUserByUsername);
router.get("/user/all", verifyToken, userController.getAllUsers);
router.get("/user/sort", verifyToken, userController.sortUsersBy);
router.get("/user/search", verifyToken, userController.searchUser);

module.exports = router;
