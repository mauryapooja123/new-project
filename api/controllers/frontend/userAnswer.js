const userAnswerService = require("../../services/userAnswer.service");

const userAnswerAdd = async (req, res) => {
  try {
    // debugger;
    const { answer, isCorrect, correctAnswer, moduleId, userId, attempt } =
      req.body;
    // const answer1 = await userAnswerService.findOne({
    //   correctAnswer,
    //   moduleId,
    // });
    // // const { attempt } = req.body;
    // if (answer1) {
    //   console.log(answer1, "already exist:::::");
    //   const attempt = req.body.attempt + 1;
    //   console.log(attempt, "attempt");
    // }
    const userAnswer = {
      answer,
      isCorrect,
      correctAnswer,
      moduleId,
      userId,
      attempt,
    };
    const createduserAnswer = await userAnswerService.post(userAnswer);
    // // console.log(createduserAnswer.attempt, "::::answer given by user");
    if (
      createduserAnswer &&
      createduserAnswer.moduleId &&
      createduserAnswer.userId
    ) {
      createduserAnswer.attempt += 1;
      //   let attempt1 = createduserAnswer.attempt;
      //   //   console.log(attempt1, "::::answer given by user________");
      //   //   for (attempt1 = attempt1; attempt1.length >= 0; attempt1 += 1) {
      //   //     return attempt1;
    }
    return res.status(201).json({
      success: true,
      message: "Answer Added Succesfully",
      data: createduserAnswer,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

module.exports = {
  userAnswerAdd,
};
