//Saga
import { takeLatest, put, call, all } from 'typed-redux-saga/macro'
//User Action
import { USER_ACTION_TYPE } from './user.types'
import {
	signInSuccess,
	signInFaild,
	signUpFaild,
	signUpSuccess,
	signOutSuccess,
	signOutFaild,
	EmailSignInStart,
    SignUpStart,
    SignUpSuccess
} from './user.action'
//Firebase
import {
	getCurrentUser,
	createUserDocumentFromAuth,
	signInWithGooglePopup,
	signInAuthUserWithEmailAndPassword,
	createAuthUserWithEmailAndPassword,
	signOutUser,
	AdditionalInformation,
} from '../../utils/firebase/firebase.utils'
import { User } from 'firebase/auth'

export function* getSnapshopFromUserAuth(
	userAuth: User,
	additionalDetails?: AdditionalInformation
) {
	try {
		const userSnapshot = yield* call(
			createUserDocumentFromAuth,
			userAuth,
			additionalDetails
		)
		if (userSnapshot) {
			yield* put(
				signInSuccess({
					id: userSnapshot.id,
					...userSnapshot.data(),
				})
			)
		}
	} catch (error) {
		yield* put(signInFaild(error as Error))
	}
}

export function* signInWithGoogle() {
	try {
		const { user } = yield* call(signInWithGooglePopup)
		yield* call(getSnapshopFromUserAuth, user)
	} catch (error) {
		yield* put(signInFaild(error as Error))
	}
}

export function* signInWithEmailAndPassword({
	payload: { email, password },
}: EmailSignInStart) {
	try {
		const userCredential = yield* call(
			signInAuthUserWithEmailAndPassword,
			email,
			password
		)
		if (userCredential) {
			const { user } = userCredential
			yield* call(getSnapshopFromUserAuth, user)
		}
	} catch (error) {
		yield* put(signInFaild(error as Error))
	}
}

export function* signUp({
	payload: { email, password, displayName },
}: SignUpStart) {
	try {
		const userCredential = yield* call(
			createAuthUserWithEmailAndPassword,
			email,
			password
		)
		if (userCredential) {
			const { user } = userCredential
            yield* put(
                signUpSuccess(user, {
                    displayName,
                })
            )
		}
	} catch (error) {
		yield* put(signUpFaild(error as Error))
	}
}

export function* signOut() {
	try {
		yield* call(signOutUser)
		yield* put(signOutSuccess())
	} catch (error) {
		yield* put(signOutFaild(error as Error))
	}
}

export function* isUserAuth() {
	try {
		const userAuth = yield* call(getCurrentUser)
		if (!userAuth) return
		yield* call(getSnapshopFromUserAuth, userAuth)
	} catch (error) {
		yield* put(signUpFaild(error as Error))
	}
}

export function* signInAfterSignUp({ payload: { user, additionalDetails } }: SignUpSuccess) {
	yield* call(getSnapshopFromUserAuth, user, additionalDetails)
}

export function* onEmailAndPasswordSingInStart() {
	yield* takeLatest(
		USER_ACTION_TYPE.EMAIL_SING_IN_START,
		signInWithEmailAndPassword
	)
}

export function* onGoogleSingInStart() {
	yield* takeLatest(USER_ACTION_TYPE.GOOGLE_SING_IN_START, signInWithGoogle)
}

export function* onCheckUserSession() {
	yield* takeLatest(USER_ACTION_TYPE.CHECK_USER_SESSION, isUserAuth)
}

export function* onSignUpStart() {
	yield* takeLatest(USER_ACTION_TYPE.SIGN_UP_START, signUp)
}

export function* onSignUpSuccess() {
	yield* takeLatest(USER_ACTION_TYPE.SIGN_UP_SUCCESS, signInAfterSignUp)
}

export function* onSignOutStart() {
	yield* takeLatest(USER_ACTION_TYPE.SIGN_OUT_START, signOut)
}

export function* userSaga() {
	yield* all([
		call(onCheckUserSession),
		call(onGoogleSingInStart),
		call(onEmailAndPasswordSingInStart),
		call(onSignUpStart),
		call(onSignUpSuccess),
		call(onSignOutStart),
	])
}
