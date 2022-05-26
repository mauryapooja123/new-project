const express = require("express");
const router = express.Router();

const questionController = require("../../controllers/admin/questionController");

router.post("/create", questionController.QuestionAdd);
router.get("/getAll", questionController.getAllData);
router.get("/getQuestionById/:id", questionController.getQuestionById);
router.get("/getAll/:pageNo/:limit", questionController.getAllquestion);
router.get("/getAllquestionById/:id", questionController.QuestionGetById);

router.put("/edit/:id", questionController.questionEdit);
router.delete("/removeById/:id", questionController.questionDelete);

module.exports = router;
