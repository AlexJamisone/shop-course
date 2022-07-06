import React from 'react';
import SingUpForm from '../../components/sign-up/sign-up';
import {
    signInWithGooglePopup,
    createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

const SignIn = () => {
    
    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user)
    }
    return (
        <div>
            <h1>Sing In Page</h1>
            <button onClick={logGoogleUser}>
                Sing in with Google Popup
            </button>
            <SingUpForm/>
        </div>
    )
}

export default SignIn;