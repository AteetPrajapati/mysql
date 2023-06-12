const roleController = require("../controllers/role.contorller")
const router = require("express").Router();

router.post("/", roleController.create);
router.post("/addPermissions", roleController.addPermissions);
router.get("/", roleController.findAll);
router.get("/:id", roleController.findAll);

module.exports = router;