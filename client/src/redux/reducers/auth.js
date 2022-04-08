import { AUTH, LOGOUT, ERR, UPDATE } from "../constants/actionsTyoe";
const authReducer = (state = { authData: null, err: [] }, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action.data }));
      return { ...state, authData: action.data };
    case LOGOUT:
      localStorage.removeItem("profile");
      return { ...state, authData: action.data };
    case ERR:
      return { ...state, err: action.payload };
    case UPDATE:
      return { ...state, authData: action.data };
    default:
      return state;
  }
};
export default authReducer;
