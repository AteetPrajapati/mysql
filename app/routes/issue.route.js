const router = require("express").Router();
const issueController = require("../controllers/issue.controller");

router.post("/", issueController.create);
router.get("/", issueController.findAll);
router.get("/:id", issueController.findAll);
router.post("/assignIssue", issueController.assignIssue);

module.exports = router;