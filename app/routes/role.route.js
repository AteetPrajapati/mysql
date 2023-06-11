const roleController = require("../controllers/role.contorller")
const router = require("express").Router();

router.post("/", roleController.create);
router.post("/addPermissions", roleController.addPermissions);
router.get("/", roleController.findAll);

module.exports = router;