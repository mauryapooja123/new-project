const express = require("express");
const courseModuleRouter = require("./course.module.router");
const courseCategoryRouter = require("./category.router");
const authRouter = require("./auth.router");
const courseRouter = require("./course.router");
const courseUnitRouter = require("./courseUnit.router");
const { authMiddleware } = require("../../middlewares/frontend/authMiddleware");
// const upload = require("../../helpers/helper");
const userRouter = require("./user.router");
const questionROuter = require("./question.router");
const blogRouter = require("./blog");
const galaryRouter = require("./galary.router");

const router = express.Router();

router.use("/", authRouter);

router.use("/", authMiddleware, userRouter);
router.use("/course", authMiddleware, courseRouter);
router.use("/courseModule", authMiddleware, courseModuleRouter);
router.use("/category", authMiddleware, courseCategoryRouter);
router.use("/courseUnit", authMiddleware, courseUnitRouter);
router.use("/question", authMiddleware, questionROuter);
router.use("/blog", authMiddleware, blogRouter);
router.use("/galary", authMiddleware, galaryRouter);

module.exports = router;
