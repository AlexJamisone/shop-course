import { createAction } from "../../utils/reducer/reducer.utils"
import { USER_ACTION_TYPE } from "./user.types"

export const setCurrentUser = (user) => 
    createAction (USER_ACTION_TYPE.SET_CURRENT_USER, user)

export const checkUserSession = () => 
    createAction(USER_ACTION_TYPE.CHECK_USER_SESSION);

export const googleSignInStart = () => 
    createAction(USER_ACTION_TYPE.GOOGLE_SING_IN_START);

export const emailSignInStart = (email, password) => 
    createAction(USER_ACTION_TYPE.EMAIL_SING_IN_START, {email, password});

export const signInSuccess = (user) => 
    createAction(USER_ACTION_TYPE.SING_IN_SUCCESS, user);

export const signInFaild = (error) => 
    createAction(USER_ACTION_TYPE.SING_IN_FAILD, error);

export const signUpStart = (email, password, displayName) => 
    createAction(USER_ACTION_TYPE.SIGN_UP_START, {email, password, displayName});

export const signUpSuccess = (user, additionalDetails) => 
    createAction(USER_ACTION_TYPE.SIGN_UP_SUCCESS, {user, additionalDetails});

export const signUpFaild = (error) => 
    createAction(USER_ACTION_TYPE.SIGN_UP_FAILD, error);

