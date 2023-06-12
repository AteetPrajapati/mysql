const router = require("express").Router();
const userController = require("../controllers/user.controller");
const { permit } = require("../middlewares/permit");

router.get("/", userController.findAll);
router.get("/:id", userController.findAll);
router.post("/", permit.super_admin, userController.create);

module.exports = router;