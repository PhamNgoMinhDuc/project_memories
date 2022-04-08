import * as api from "../../api/index.js";
import { AUTH, ERR, UPDATE } from "../constants/actionsTyoe";

export const signin = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });
    navigate("/home");
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
    navigate("/home");
  } catch (error) {
    console.log(error);
    let err = error.response.data;
    dispatch({ type: ERR, payload: err });
  }
};

export const changeInfor = (id, formData) => async (dispatch) => {
  try {
    const { data } = await api.changeInfor(id, formData);
    console.log(data);
    dispatch({ type: UPDATE, data });
    dispatch({ type: AUTH, data });
  } catch (error) {
    console.log(error);
    let err = error.response.data;
    dispatch({ type: ERR, payload: err });
  }
};

export const changePassword = (id, formData) => async (dispatch) => {
  try {
    const { data } = await api.changePassword(id, formData);
    console.log(data);
    dispatch({ type: UPDATE, data });
  } catch (error) {
    let err = error.response.data;
    dispatch({ type: ERR, payload: err });
  }
};
