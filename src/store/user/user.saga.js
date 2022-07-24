//Saga
import { takeLatest, put, call, all } from "redux-saga/effects";
//User
import { USER_ACTION_TYPE } from "./user.types";
import { signInSuccess, signInFaild } from "./user.action";
//Firebase
import { 
    getCurrentUser,
    createUserDocumentFromAuth
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

export function* isUserAuth() {
    try {
        const userAuth = yield call(getCurrentUser)
        if(!userAuth) return
        yield call(getSnapshopFromUserAuth, userAuth)
    } catch (error) {
        yield put(signInFaild(error))
    }
}

export function* onCheckUserSession() {
    yield takeLatest(USER_ACTION_TYPE.CHECK_USER_SESSION, isUserAuth)
}

export function* userSaga() {
    yield all([call(onCheckUserSession)])
}