const express = require("express");
// routers
const authRouter = require("./auth");
const courseRouter = require("./course");
const courseModuleRouter = require("./courseModule");
const courseUnitRouter = require("./courseUnit");
const questionRouter = require("./question");
const userUnitRouter = require("./userUnit");
const userAnswerRouter = require("./userAnswer");
const blogCategoryRouter = require("./blogCategory");
const blogRouter = require("./blog");
const { authMiddleware } = require("../../middlewares/frontend/authMiddleware");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/course", courseRouter);
router.use("/courseModule", courseModuleRouter);
router.use("/courseUnit", courseUnitRouter);
router.use("/question", questionRouter);
router.use("/userUnit", authMiddleware, userUnitRouter);
router.use("/userAnswer", authMiddleware, userAnswerRouter);
router.use("/blogCategory", blogCategoryRouter);
router.use("/blog", blogRouter);
//  authMiddleware,
module.exports = router;
// authMiddleware,
