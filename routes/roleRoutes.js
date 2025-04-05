const expresss = require('express');
const router = expresss.Router();
const {verifyToken, verifyRole} = require('../middleware/authMiddleware');
const roleController = require('../controllers/roleController');
const roleRequired = 1;

router.get('/role/:id([0-9]+)', verifyToken, verifyRole(roleRequired), roleController.getRoleById);
router.get('/role', verifyToken, verifyRole(roleRequired), roleController.getRoleByName);
router.get('/role/all', verifyToken, verifyRole(roleRequired), roleController.getRoles)

module.exports = router;