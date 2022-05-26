import { Modal, Button, Form } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import * as courseServices from "../../services/courseServices";
import * as questionService from "../../services/questionService";
import * as courseModuleService from "../../services/courseModule";
import _ from "lodash";
import { createNotification } from "../../helper/notification";
import { useNavigate } from "react-router-dom";
import AddQuestionCourse from "./addQuestionCourse";
import AddQuestionAll from "./addQuestionall";

const AddQuestion = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [check, setCheck] = useState(false);
  const [courseoptions, setCourseoptions] = useState([]);
  const [courseModuleOptions, setCourseModuleOptions] = useState([]);
  const [input, setInput] = useState([{ option: "", isAnswer: true }]);
  const [addQuestion, setAddQuestion] = useState({
    question: "",
    answer: "",
    marks: "",
  });
  const [ids, setIds] = useState({
    courseId: "",
    module: "",
    courseUnit: "",
  });
  const [error, setError] = useState([]);
  const [allquestion, setAllquestion] = useState([]);
  const [courseUNitTitleOptions, setCourseUNitTitleOptions] = useState([]);

  const formValidation = () => {
    const { answer, marks, question, courseId, module } = addQuestion;
    const options = [...input];
    let formErrors = {};
    let isValid = true;
    if (!courseoptions) {
      isValid = false;
      formErrors["courseId"] = "Please enter course ";
    }
    if (!courseModuleOptions) {
      isValid = false;
      formErrors["module"] = "Please enter module";
    }
    if (!question) {
      isValid = false;
      formErrors["question"] = "Please enter question";
    }

    if (!answer) {
      isValid = false;
      formErrors["answer"] = "Please enter answer explanation";
    }
    if (!marks) {
      isValid = false;
      formErrors["marks"] = "Please enter marks";
    }

    if (options.length <= 1) {
      isValid = false;
      formErrors["option"] = "Please select more answer option";
    }

    setError(formErrors);
    return isValid;
  };

  useEffect(() => {
    getCourse();
  }, []);
  const pushquestion = () => {
    let sub = [...input];
    sub.push({ option: "", isAnswer: false });
    setInput(sub);
  };
  const clickAddQuestion = async (e) => {
    if (formValidation()) {
      try {
        const data = {
          questions: [...input],
          question: addQuestion.question,
          answer: addQuestion.answer,
          marks: addQuestion.marks,
        };

        setAllquestion([...allquestion, data]);
        createNotification("success", "Data Added");

        setInput([{ option: "", isAnswer: true }]);
        setAddQuestion({
          question: "",
          answer: "",
          marks: "",
        });
      } catch (err) {
        console.log(err.message);
      }
    }
  };
  const getCourse = async () => {
    const response = await courseServices.getAll();
    setCourseoptions(response.data.data);
  };

  const handleChangeModule = (e) => {
    const { name, value } = e.target;

    setIds({
      ...ids,
      [name]: value,
    });

    if (name === "courseId") {
      getCourseModule(value);
    }
    if (name === "module") {
      getcourseUniTitle(value);
    }
  };

  const getCourseModule = async (courseId) => {
    const response = await courseModuleService.getModuleById(courseId);
    setCourseModuleOptions(response.data.data);
  };

  const getcourseUniTitle = async (module) => {
    const response = await courseModuleService.getCourseUnittitleById(module);
    setCourseUNitTitleOptions(response.data.data);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const handleChange = (input) => (e) => {
    setStep({ [input]: e.target.value });
  };

  const inputHandle = (e, index) => {
    let data = [...input];

    data[index] = {
      ...data[index],
      option: e.target.value,
    };

    setInput([...data]);
  };
  const handleRadio = (e, index) => {
    let data = [...input];
    data = data.map((item) => {
      return { ...item, isAnswer: false };
    });
    data[index] = {
      ...data[index],
      isAnswer: true,
    };

    setInput([...data]);
  };

  const handleQuestionChange = (e) => {
    const { name, value } = e.target;
    setAddQuestion({
      ...addQuestion,
      [name]: value,
    });
  };

  const submitClick = async () => {
    try {
      const data = {
        courseId: ids.courseId,
        module: ids.module,
        questions: JSON.stringify(allquestion),
        isUnitQuiz: check,
        coursUnitId: check ? ids.courseUnit : null,
      };
      // console.log(data, "********");
      console.log(allquestion.length, "data.questions");
      if (allquestion.length < 1) {
        createNotification("error", "Add Some Question");
      } else {
        const response = await questionService.addQuestion(data);
        if (response.status === 400) {
          createNotification("error", response.message);
        } else {
          createNotification("success", response.message);
          setTimeout(() => {
            navigate("/question");
          }, 2000);

          setAddQuestion("");
          setInput([input]);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangechanck = (e) => {
    setCheck(!check);
  };

  switch (step) {
    case 1:
      return (
        <AddQuestionCourse
          nextStep={nextStep}
          handleChange={handleChange}
          course={courseoptions}
          module={courseModuleOptions}
          handle={handleChangeModule}
          error={error}
          courseId={ids.courseId}
          moduleId={ids.module}
          check={check}
          courseUnitId={ids.courseUnit}
          handleChangechanck={handleChangechanck}
          courseUNitTitleOptions={courseUNitTitleOptions}
        />
      );
    case 2:
      return (
        <AddQuestionAll
          prevStep={prevStep}
          nextStep={nextStep}
          handleChange={handleChange}
          handleInput={inputHandle}
          handleRadio={handleRadio}
          addQuestion={addQuestion}
          inputValue={input}
          setInput={setInput}
          handleQuestionChange={handleQuestionChange}
          clickAddQuestion={clickAddQuestion}
          pushquestion={pushquestion}
          submitClick={submitClick}
          error={error}
        />
      );
  }
};

export default AddQuestion;
