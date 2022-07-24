//Saga
import { takeLatest, put, call, all } from "redux-saga/effects";
//User
import { USER_ACTION_TYPE } from "./user.types";
import { signInSuccess, signInFaild, signUpFaild, signUpSuccess } from "./user.action";
//Firebase
import { 
    getCurrentUser,
    createUserDocumentFromAuth,
    signInWithGooglePopup,
    signInAuthUserWithEmailAndPassword,
    createAuthUserWithEmailAndPassword
} from "../../utils/firebase/firebase.utils";

export function* getSnapshopFromUserAuth(userAuth, additionalDetails) {
    try {
        const userSnapshot = yield call(
            createUserDocumentFromAuth,
            userAuth,
            additionalDetails
        )
        yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data()}))
    } catch (error) {
        yield put(signInFaild(error))
    }
}

export function* signInWithGoogle() {
    try {
        const {user} = yield call(signInWithGooglePopup)
        yield call(getSnapshopFromUserAuth, user)
    } catch (error) {
        yield put(signInFaild(error))
    }
}

export function* signInWithEmailAndPassword({payload: {email, password}}) {
    try {
        const { user } = yield call(
            signInAuthUserWithEmailAndPassword,
            email,
            password
        )
        yield call(getSnapshopFromUserAuth, user)
    } catch (error) {
        yield put(signInFaild(error))
    }
}

export function* signUp({payload: {email, password, displayName}}) {
    try {
        const { user } = yield call(
            createAuthUserWithEmailAndPassword,
            email,
            password
        )
        yield put(signUpSuccess(user, {displayName}))
    } catch (error) {
        yield put(signUpFaild(error))
    }
}

export function* isUserAuth() {
    try {
        const userAuth = yield call(getCurrentUser)
        if(!userAuth) return
        yield call(getSnapshopFromUserAuth, userAuth)
    } catch (error) {
        yield put(signUpFaild(error))
    }
}

export function* signInAfterSignUp({payload: {user, additionalDetails}}) {
    yield call(getSnapshopFromUserAuth, user, additionalDetails)
}

export function* onEmailAndPasswordSingInStart() {
    yield takeLatest(USER_ACTION_TYPE.EMAIL_SING_IN_START, signInWithEmailAndPassword)
}

export function* onGoogleSingInStart() {
    yield takeLatest(USER_ACTION_TYPE.GOOGLE_SING_IN_START, signInWithGoogle)
}

export function* onCheckUserSession() {
    yield takeLatest(USER_ACTION_TYPE.CHECK_USER_SESSION, isUserAuth)
}

export function* onSignUpStart() {
    yield takeLatest(USER_ACTION_TYPE.SIGN_UP_START, signUp)
}

export function* onSignUpSuccess() {
    yield takeLatest(USER_ACTION_TYPE.SIGN_UP_SUCCESS, signInAfterSignUp)
}

export function* userSaga() {
    yield all([
        call(onCheckUserSession),
        call(onGoogleSingInStart),
        call(onEmailAndPasswordSingInStart),
        call(onSignUpStart),
        call(onSignUpSuccess)
    ])
}