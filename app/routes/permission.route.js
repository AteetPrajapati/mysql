const router = require("express").Router();
const permissionController = require("../controllers/permission.controller");

router.post("/", permissionController.create);
router.get("/", permissionController.findAll);
router.delete("/:id", permissionController.delete);

module.exports = router;