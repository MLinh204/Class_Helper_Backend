const expresss = require("express");
const router = expresss.Router();
const apiKeyController = require("../controllers/APIKeyController");
const { verifyToken, verifyRole } = require("../middleware/authMiddleware");
const roleRequired = 1;
router.post(
  "/api-key/password-reset",
  apiKeyController.createPasswordResetToken
);
router.get(
  "/api-key/password-reset",
  verifyToken,
  apiKeyController.getPasswordResetToken
);
router.put(
  "/api-key/password-reset/expired",
  verifyToken,
  verifyRole(roleRequired),
  apiKeyController.setExpired
);
router.put("/api-key/password-reset/reset", apiKeyController.resetPassword);
module.exports = router;
