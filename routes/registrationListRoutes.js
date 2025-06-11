const expresss = require("express");
const router = expresss.Router();
const { verifyToken, verifyRole } = require("../middleware/authMiddleware");
const registrationListController = require("../controllers/registrationListController");
const roleRequired = 1;

router.get(
  "/registrationList/:id([0-9]+)",
  verifyToken,
  verifyRole(roleRequired),
  registrationListController.getRegistrationListById
);
router.post(
  "/registrationList",
  verifyToken,
  verifyRole(roleRequired),
  registrationListController.addRegistrationList
);
router.get(
  "/registrationList/all",
  verifyToken,
  verifyRole(roleRequired),
  registrationListController.getRegistrationLists
);
router.get(
  "/registrationList",
  verifyToken,
  verifyRole(roleRequired),
  registrationListController.getRegistrationListByUsername
);
router.put(
  "/registrationList/:id",
  verifyToken,
  verifyRole(roleRequired),
  registrationListController.updateRegistrationList
);
router.delete(
  "/registrationList/:id",
  verifyToken,
  verifyRole(roleRequired),
  registrationListController.deleteRegistrationList
);
router.get(
  "/registrationList/checkRegister",
  verifyToken,
  verifyRole(roleRequired),
  registrationListController.isUserAllowedRegistration
);
router.get(
  "/registrationList/search",
  verifyToken,
  verifyRole(roleRequired),
  registrationListController.searchRegistrationList
);
router.get(
  "/registrationList/sort",
  verifyToken,
  verifyRole(roleRequired),
  registrationListController.sortRegistrationListsBy
);

module.exports = router;
