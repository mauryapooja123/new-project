const express = require("express");
const router = express.Router();

const questionController = require("../../controllers/frontend/question");

router.get("/getAll", questionController.getAllquestion);

router.get("/getAll/:pageNo/:limit", questionController.getAll);

router.get("/getQuestionById/:id", questionController.getQuestionById);
router.get(
  "/getQuestionByModuleIdAndUnitId/:ModuleId/:UnitId",
  questionController.getQuestionByModuleIdAndUnitId
);
router.get(
  "/getQuestionByUnitId/:UnitId",
  questionController.getQuestionByUnitId
);

module.exports = router;
