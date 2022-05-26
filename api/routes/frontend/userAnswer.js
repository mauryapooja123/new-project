const express = require("express");
const router = express.Router();

const userAnswerController = require("../../controllers/frontend/userAnswer");

router.post("/create", userAnswerController.userAnswerAdd);

module.exports = router;
