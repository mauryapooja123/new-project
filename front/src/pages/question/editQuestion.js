import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

import * as courseServices from "../../services/courseModule";
import * as courseModuleService from "../../services/courseModule";
import * as courseQuestionService from "../../services/questionService";
import { createNotification } from "../../helper/notification";
import { ToastContainer } from "react-toastify";
import Layout from "../../layout/Layout";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import EditQuestionCourse from "./editQuestionCourse";
import EditQuestionAll from "./editQuestionAll";

import _ from "lodash";

const EditCourseUnit = () => {
  const [pageAfterSearch, setPageAfterSearch] = useState(false);
  const [courseUNitTitleOptions, setCourseUNitTitleOptions] = useState([]);

  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [input, setInput] = useState([{ option: "", isAnswer: false }]);
  const [courseId, setCourseId] = useState("");
  const [module, setModule] = useState("");
  const [courseUnitId, setCoursreUnitId] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [marks, setMarks] = useState("");
  const [error, setError] = useState({});
  const [check, setCheck] = useState(false);
  const [courseoptions, setCourseoptions] = useState([]);
  const [courseModuleOptions, setCourseModuleOptions] = useState([]);
  const [data, setData] = useState([]);
  const formValidation = () => {
    // const options = [...input];

    let formErrors = {};
    let isValid = true;
    if (!courseId) {
      isValid = false;
      formErrors["courseId"] = "Please Enter Course ";
    }
    if (!module) {
      isValid = false;
      formErrors["module"] = "Please Enter Module";
    }
    if (!question) {
      isValid = false;
      formErrors["question"] = "Please Enter Question";
    }

    setError(formErrors);
    return isValid;
  };
  useEffect(() => {
    getCourse();
    getAuestionById();
  }, []);

  const { _id } = useParams();

  const getAuestionById = async () => {
    const response = await courseQuestionService.getAllQuestionById(_id);

    getCourseModule(response.data.courseId);
    getcourseUniTitle(response.data.module);
    setCheck(response.data.isUnitQuiz);
    setCourseId(response.data.courseId);
    setModule(response.data.module);
    setCoursreUnitId(response.data.coursUnit);
    setMarks(
      response.data.questions.map((val) => {
        return val.marks;
      })
    );
    setAnswer(
      response.data.questions.map((val) => {
        return val.answer;
      })
    );
    setQuestion(
      response.data.questions.map((val) => {
        return val.question;
      })
    );
    setInput(response.data);
    setData(response.data.questions);
  };

  const getCourse = async () => {
    const response = await courseServices.getAll();
    setCourseoptions(response.data.data);
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

  const handle = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  const editHnadlecourse = (e) => {
    setCourseId(e.target.value);
    getCourseModule(e.target.value);
  };
  const edithandlemodule = (e) => {
    setModule(e.target.value);
    getcourseUniTitle(e.target.value);
  };
  const edithandleCourseUnit = (e) => {
    setCoursreUnitId(e.target.value);
  };

  const handleChangechanck = (e) => {
    setCheck(!check);
  };

  switch (step) {
    case 1:
      return (
        <EditQuestionCourse
          nextStep={nextStep}
          handleChange={handleChange}
          courseoptions={courseoptions}
          courseModuleOptions={courseModuleOptions}
          getCourseModule={getCourseModule}
          courseId={courseId}
          module={module}
          editHnadlecourse={editHnadlecourse}
          edithandlemodule={edithandlemodule}
          edithandleCourseUnit={edithandleCourseUnit}
          error={error}
          formValidation={formValidation}
          courseUNitTitleOptions={courseUNitTitleOptions}
          courseUnitId={courseUnitId}
          check={check}
          handleChangechanck={handleChangechanck}
        />
      );
    case 2:
      return (
        <EditQuestionAll
          prevStep={prevStep}
          nextStep={nextStep}
          handleChange={handleChange}
          data={data}
          handle={handle}
          courseId={courseId}
          module={module}
          id={_id}
          check={check}
          courseUnitId={courseUnitId}
        />
      );

    default:
    // do nothing
  }
};

export default EditCourseUnit;
