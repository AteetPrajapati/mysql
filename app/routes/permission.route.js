const router = require("express").Router();
const permissionController = require("../controllers/permission.controller");

router.post("/", permissionController.create);
router.get("/", permissionController.findAll);

module.exports = router;