const db = require("../../config/sequelize");
const issueModel = require("../models/issue.model");
const issuesAssigneeModels = require("../models/issues_assignees.model");
const User = require("../models/user.model");
const getuser = require("../utils/getCurrentUser");
const rcode = require("../utils/response-codes");

exports.create = async (req, res) => {
    try {
        db.transaction(async function (transaction) {
            const body = req.body;
            body.updated_by = getuser(req).id;
            body.issued_by = getuser(req).id;
            const issue = await issueModel.create(req.body, { transaction });
            res.send(issue);
        })
    } catch (error) {
        res.status(rcode.OK).send(error);
    }
}

exports.assignIssue = async (req, res) => {
    try {
        await db.transaction(async function (transaction) {
            const issueAssignBulk = req.body.assignee_ids.map((e) => { return { issueId: req.body.issue_id, userId: e } });
            await issuesAssigneeModels.destroy({ where: { issueId: req.body.issue_id } }, { transaction });
            await issuesAssigneeModels.bulkCreate(issueAssignBulk, { transaction });
        });
        await issueModel.update({ updated_by: getuser(req).id }, { where: { id: req.body.issue_id } });
        let task = await issueModel.findOne({
            where: {
                id: req.body.issue_id
            },
            include: {
                model: User,
                as: "assignees"
            }
        })
        res.send(task);
    } catch (error) {
        res.status(rcode.OK).send(error);
    }
}

exports.findAll = async (req, res) => {
    try {
        let task = await issueModel.findAll({
            where: {
                ...(req.params.id ? { id: req.params.id } : {})
            },
            include: {
                model: User,
                as: "assignees",
                through: {
                    attributes: []
                },
            }
        })
        res.send(task);
    } catch (error) {
        res.status(rcode.BadRequest).send({ message: "Something went wrong" })
    }
}