export const SIGN_UP = {
  USER_NAME_INPUT: "userName",
  USER_NAME_VALIDATION: "validName",
  USER_NAME_FOCUS: "userNameFocus",
  EMAIL_INPUT: "email",
  EMAIL_VALIDATION: "validEmail",
  EMAIL_FOCUS: "emailFocus",
  PASSWORD_INPUT: "pwd",
  PASSWORD_VALIDATION: "validPwd",
  PASSWORD_FOCUS: "pwdFocus",
  PWD_MATCH_INPUT: "matchPwd",
  PWD_MATCH_VALIDATION: "validMatch",
  PWD_MATCH_FOCUS: "matchFocus",
  ERROR_MSG: "errMsg",
  RESTORE_STATE: "restore",
};

export const signUpReducer = (state, action) => {
  switch (action.type) {
    case SIGN_UP.USER_NAME_INPUT:
      return { ...state, userName: action.payload };
    case SIGN_UP.USER_NAME_VALIDATION:
      return { ...state, validName: action.payload };
    case SIGN_UP.USER_NAME_FOCUS:
      return { ...state, userNameFocus: action.payload };
    case SIGN_UP.EMAIL_INPUT:
      return { ...state, email: action.payload };
    case SIGN_UP.EMAIL_VALIDATION:
      return { ...state, validEmail: action.payload };
    case SIGN_UP.EMAIL_FOCUS:
      return { ...state, emailFocus: action.payload };
    case SIGN_UP.PASSWORD_INPUT:
      return { ...state, pwd: action.payload };
    case SIGN_UP.PASSWORD_VALIDATION:
      return { ...state, validPwd: action.payload };
    case SIGN_UP.PASSWORD_FOCUS:
      return { ...state, pwdFocus: action.payload };
    case SIGN_UP.PWD_MATCH_INPUT:
      return { ...state, matchPwd: action.payload };
    case SIGN_UP.PWD_MATCH_VALIDATION:
      return { ...state, validMatch: action.payload };
    case SIGN_UP.PWD_MATCH_FOCUS:
      return { ...state, matchFocus: action.payload };
    case SIGN_UP.ERROR_MSG:
      return { ...state, errMsg: action.payload };
    case SIGN_UP.RESTORE_STATE:
      return action.payload;
    default:
      throw new Error("Something went wrong");
  }
};

export const initialSignUpState = {
  userName: "",
  validName: false,
  userNameFocus: false,
  email: "",
  validEmail: false,
  emailFocus: false,
  pwd: "",
  validPwd: false,
  pwdFocus: false,
  matchPwd: "",
  validMatch: false,
  matchFocus: false,
  errMsg: "",
};
