import * as types from "../../types/auth";
import * as authService from "../../services/authServices";
import { createNotification } from "../../helper/notification";

export const loginUser = (user, navigate) => {
  return async (dispatch) => {
    try {
      dispatch({ type: types.LOGIN_USER });
      let response = await authService.loginUser(user);
      let dataObj = response.data;

      if (response.status === 200) {
        createNotification("success", dataObj.message);
        setTimeout(() => {
          navigate("/course");
        }, 3000);

        localStorage.setItem("admin_token", dataObj.data.token);
        localStorage.setItem("userid_", dataObj.data.user._id);
        dispatch({
          type: types.LOGIN_USER_SUCCESS,
          payload: response.data.data,
        });
      } else {
        createNotification("error", dataObj.message);
        dispatch({
          type: types.LOGIN_USER_FAILURE,
          payload: dataObj.message,
        });
      }
    } catch (e) {
      dispatch({
        type: types.LOGIN_USER_FAILURE,
        payload: e.message,
      });
      console.log(e.message);
    }
  };
};
