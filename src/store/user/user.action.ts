import {
	createAction,
	withMatcher,
	Action,
	ActionWithPayload,
} from '../../utils/reducer/reducer.utils'
import { USER_ACTION_TYPE } from './user.types'
import {
	UserData,
	AdditionalInformation,
} from '../../utils/firebase/firebase.utils'

//Types

export type CheckUserSeesion = Action<USER_ACTION_TYPE.CHECK_USER_SESSION>

export type SetCurrentUser = ActionWithPayload<
	USER_ACTION_TYPE.SET_CURRENT_USER,
	UserData
>
export type GoogleSignInStart = Action<USER_ACTION_TYPE.GOOGLE_SING_IN_START>

export type EmailSignInStart = ActionWithPayload<
	USER_ACTION_TYPE.EMAIL_SING_IN_START,
	{ email: string; password: string }
>

export type SignInSuccess = ActionWithPayload<
	USER_ACTION_TYPE.SING_IN_SUCCESS,
	UserData
>

export type SignInFaild = ActionWithPayload<
	USER_ACTION_TYPE.SING_IN_FAILD,
	Error
>

export type SignUpStart = ActionWithPayload<
	USER_ACTION_TYPE.SIGN_UP_START,
	{ email: string; password: string; displayName: string }
>

export type SignUpSuccess = ActionWithPayload<
	USER_ACTION_TYPE.SIGN_UP_SUCCESS,
	{ user: UserData; additionalDetails: AdditionalInformation }
>
export type SignUpFaild = ActionWithPayload<
	USER_ACTION_TYPE.SIGN_UP_FAILD,
	Error
>

export type SignOutStart = Action<USER_ACTION_TYPE.SIGN_OUT_START>
export type SignOutSuccess = Action<USER_ACTION_TYPE.SIGN_OUT_SUCCESS>
export type SignOutFaild = ActionWithPayload<
	USER_ACTION_TYPE.SIGN_OUT_FAILD,
	Error
>
//Action
export const checkUserSession = withMatcher(
	(): CheckUserSeesion => createAction(USER_ACTION_TYPE.CHECK_USER_SESSION)
)

export const setCurrentUser = withMatcher(
	(user: UserData): SetCurrentUser =>
		createAction(USER_ACTION_TYPE.SET_CURRENT_USER, user)
)

export const googleSignInStart = withMatcher(
	(): GoogleSignInStart => createAction(USER_ACTION_TYPE.GOOGLE_SING_IN_START)
)

export const emailSignInStart = withMatcher(
	(email: string, password: string): EmailSignInStart =>
		createAction(USER_ACTION_TYPE.EMAIL_SING_IN_START, {
			email,
			password,
		})
)

export const signInSuccess = withMatcher(
	(user: UserData): SignInSuccess =>
		createAction(USER_ACTION_TYPE.SING_IN_SUCCESS, user)
)

export const signInFaild = withMatcher(
	(error: Error): SignInFaild =>
		createAction(USER_ACTION_TYPE.SING_IN_FAILD, error)
)

export const signUpStart = withMatcher(
	(email: string, password: string, displayName: string): SignUpStart =>
		createAction(USER_ACTION_TYPE.SIGN_UP_START, {
			email,
			password,
			displayName,
		})
)

export const signUpSuccess = withMatcher(
	(user: UserData, additionalDetails: AdditionalInformation): SignUpSuccess =>
		createAction(USER_ACTION_TYPE.SIGN_UP_SUCCESS, {
			user,
			additionalDetails,
		})
)

export const signUpFaild = withMatcher(
	(error: Error): SignUpFaild =>
		createAction(USER_ACTION_TYPE.SIGN_UP_FAILD, error)
)

export const signOutStart = withMatcher(
	(): SignOutStart => createAction(USER_ACTION_TYPE.SIGN_OUT_START)
)

export const signOutSuccess = withMatcher(
	(): SignOutSuccess => createAction(USER_ACTION_TYPE.SIGN_OUT_SUCCESS)
)

export const signOutFaild = withMatcher(
	(error: Error): SignOutFaild =>
		createAction(USER_ACTION_TYPE.SIGN_OUT_FAILD, error)
)
