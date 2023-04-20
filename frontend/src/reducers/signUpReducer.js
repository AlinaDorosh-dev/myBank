/**
 * @fileoverview This file contains the reducer for manage state in the sign up form
 */
import { EMAIL_REGEX, PWD_REGEX } from "../utils/regex";

export const initialSignUpState = {
  email: "",
  validEmail: false,
  pwd: "",
  validPwd: false,
  matchPwd: "",
  validMatch: false,
  errMsg: "",
};

//action types
export const SIGN_UP = {
  EMAIL_INPUT: "email",
  EMAIL_VALIDATION: "validEmail",
  PASSWORD_INPUT: "pwd",
  PASSWORD_VALIDATION: "validPwd",
  PWD_MATCH_INPUT: "matchPwd",
  PWD_MATCH_VALIDATION: "validMatch",
  ERROR_MSG: "errMsg",
  RESTORE_STATE: "restore",
};

export const signUpReducer = (state, action) => {
  switch (action.type) {
    case SIGN_UP.EMAIL_INPUT:
      return { ...state, email: action.payload };
    case SIGN_UP.EMAIL_VALIDATION:
      return { ...state, validEmail: EMAIL_REGEX.test(state.email) };
    case SIGN_UP.PASSWORD_INPUT:
      return { ...state, pwd: action.payload };
    case SIGN_UP.PASSWORD_VALIDATION:
      return { ...state, validPwd: PWD_REGEX.test(state.pwd) };
    case SIGN_UP.PWD_MATCH_INPUT:
      return { ...state, matchPwd: action.payload };
    case SIGN_UP.PWD_MATCH_VALIDATION:
      return { ...state, validMatch: state.pwd === state.matchPwd };
    case SIGN_UP.ERROR_MSG:
      return { ...state, errMsg: action.payload };
    case SIGN_UP.RESTORE_STATE:
      return initialSignUpState;
    default:
      throw new Error("Something went wrong");
  }
};
