window.process = {};
import React from "react";
import "./App.css";
import "./assets/css/style.css";
import "./assets/vendors/typicons/typicons.css";
import "./assets/vendors/font-awesome/css/font-awesome.min.css";
import "./assets/scss/main.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/login/Login";
import Profile from "./pages/profile";
import ResetPassword from "./pages/resetPassword/ResetPassword";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./Hoc/Privaterouter";
import ChangePassword from "./pages/profile/ChangePassword";
import Course from "./pages/course/course";
import ProtectedRoutes from "./Hoc/protectedRouters";
import CourseModule from "./pages/courseModule/courseModule";
import CourseUnit from "./pages/courseUnit/CourseUnit";
import CourseCategory from "./pages/courseCategory/courseCategory";
import Question from "./pages/question/question";
import Galary from "./pages/galary/galary";
import Galary2 from "./pages/gallery2/gallery2";
import AddQuestion from "./pages/question/addQuestion";
import AddCourseUnit from "./pages/courseUnit/addCourseUnit";
import EditCourseUnit from "./pages/courseUnit/editCourseUnit";
import EditQuestion from "./pages/question/editQuestion";
import Blog from "./pages/blog/blog";
import AddBlog from "./pages/blog/addBlog";
import EditBlog from "./pages/blog/editBlog";
import Hello from "./hello/Hello";
import AddImages from "./../src/pages/addImages/AddImages";
import CoursePage from "./pages/CoursePage/CoursePage";
import CoursePageParent from "./pages/CoursePage/CoursePageParent";
import ModulePage from "./pages/ModulePage";
import IndexPage from "./models/NewPage/IndexPage";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/hello" element={<Hello />} />
          <Route
            isAuth={true}
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          {/* <Route
            isAuth={true}
            path="/course"
            element={
              <PrivateRoute>
                <Course />
              </PrivateRoute>
            }
          /> */}
          <Route
            isAuth={true}
            path="/course"
            element={
              <PrivateRoute>
                <CoursePageParent />
              </PrivateRoute>
            }
          />
          <Route
            isAuth={true}
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            isAuth={true}
            path="/gallery"
            element={
              <PrivateRoute>
                <Galary />
              </PrivateRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoutes>
                <Login />
              </ProtectedRoutes>
            }
          ></Route>

          {/* <Route path="/user" element={<GetAllUSers />}></Route> */}
          <Route
            path="/forgot/resetPassword/:token"
            element={<ResetPassword />}
          />
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/changepassword" element={<ChangePassword />}></Route>
          {/* <Route
            isAuth={true}
            path="/coursemodule"
            element={
              <PrivateRoute>
                <CourseModule />
              </PrivateRoute>
            }
          ></Route> */}
          {/* <Route
            isAuth={true}
            path="/coursemodule"
            element={
              <PrivateRoute>
                <ModulePage />
              </PrivateRoute>
            }
          ></Route> */}

          <Route
            isAuth={true}
            path="/course"
            element={
              <PrivateRoute>
                <Course />
              </PrivateRoute>
            }
          ></Route>
          <Route
            isAuth={true}
            path="/coursemodule"
            element={
              <PrivateRoute>
                <IndexPage />
              </PrivateRoute>
            }
          ></Route>
          <Route
            isAuth={true}
            path="/courseunit"
            element={
              <PrivateRoute>
                <CourseUnit />
              </PrivateRoute>
            }
          ></Route>
          <Route
            isAuth={true}
            path="/gallery2"
            element={
              <PrivateRoute>
                <Galary2 />
              </PrivateRoute>
            }
          />
          <Route
            isAuth={true}
            path="/add-image"
            element={
              <PrivateRoute>
                <AddImages />
              </PrivateRoute>
            }
          />
          <Route
            isAuth={true}
            path="/blogcategory"
            element={
              <PrivateRoute>
                <CourseCategory />
              </PrivateRoute>
            }
          ></Route>
          <Route
            isAuth={true}
            path="/question"
            element={
              <PrivateRoute>
                <Question />
              </PrivateRoute>
            }
          ></Route>
          <Route
            isAuth={true}
            path="/question/add"
            element={
              <PrivateRoute>
                <AddQuestion />
              </PrivateRoute>
            }
          ></Route>
          <Route
            isAuth={true}
            path="/courseunit/add"
            element={
              <PrivateRoute>
                <AddCourseUnit />
              </PrivateRoute>
            }
          ></Route>
          <Route
            isAuth={true}
            path="/question/edit/:_id"
            element={
              <PrivateRoute>
                <EditQuestion />
              </PrivateRoute>
            }
          ></Route>
          <Route
            isAuth={true}
            path="/courseunit/edit/:_id"
            element={
              <PrivateRoute>
                <EditCourseUnit />
              </PrivateRoute>
            }
          ></Route>
          <Route
            isAuth={true}
            exact
            path="/blog"
            element={
              <PrivateRoute>
                <Blog />
              </PrivateRoute>
            }
          ></Route>
          <Route
            isAuth={true}
            exact
            path="/blog/plus"
            element={
              <PrivateRoute>
                <AddBlog />
              </PrivateRoute>
            }
          ></Route>
          <Route
            isAuth={true}
            exact
            path="/blog/editBlog/:id"
            element={
              <PrivateRoute>
                <EditBlog />
              </PrivateRoute>
            }
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
