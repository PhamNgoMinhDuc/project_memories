import * as api from "../../api/index.js";
import { AUTH, ERR } from "../constants/actionsTyoe";

export const signin = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });
    navigate("/");
  } catch (error) {
    console.log(error);
    let err = error.response.data;
    dispatch({ type: ERR, payload: err });
  }
};

export const signup = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });
    navigate("/");
  } catch (error) {
    console.log(error);
    let err = error.response.data;
    dispatch({ type: ERR, payload: err });
  }
};

export const changeInfor = (id, formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.changeInfor(id, formData);

    dispatch({ type: AUTH, data });
    /* navigate("/"); */
    window.location.reload();
  } catch (error) {
    console.log(error);
    let err = error.response.data;
    dispatch({ type: ERR, payload: err });
  }
};

export const changePassword = (id, formData, navigate, isShowingUser) => async (dispatch) => {
  try {
    const { data } = await api.changePassword(id, formData);

    dispatch({ type: AUTH, data });

    /* navigate("/"); */

    window.location.reload();
  } catch (error) {
    console.log(error);
    let err = error.response.data;
    dispatch({ type: ERR, payload: err });
  }
};
