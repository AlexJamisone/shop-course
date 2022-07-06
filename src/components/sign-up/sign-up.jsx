import React, { useState } from 'react';
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';


const defaltformFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SingUpForm = () => {
    const [formFields, setformFields] = useState(defaltformFields);
    const {displayName, email, password, confirmPassword} = formFields;

    const resetFields = () => {
        setformFields(defaltformFields)
    }

    const handlSubmit = async (e) => {
        e.preventDefault();
        if(password !== confirmPassword) {
            alert('password do not match')
            return;
        }
        try {
            const { user } = await createAuthUserWithEmailAndPassword(
                email,
                password
            )
            await createUserDocumentFromAuth(user, {displayName})
            resetFields();
        } catch (error) {
            if(error.code === 'auth/email-already-in-use') {
                alert('Cannot create userm email already in use')
            } else {
                console.log(`error with submitForm`, error);
            }
        }
    }

    const handlChenge = (e) => {
        const { name, value } = e.target;

        setformFields({...formFields, [name]: value})
    };

    return (
    <div>
        <h1>Sing up with youre email and password</h1>
        <form onSubmit={handlSubmit}>
            <label>Display Name</label>
            <input
                onChange={handlChenge}
                type='text'
                required
                name='displayName'
                value={displayName}
            />

            <label>Email</label>
            <input
                onChange={handlChenge}
                type='email'
                required
                name='email'
                value={email}
            />

            <label>Password</label>
            <input
                onChange={handlChenge}
                type='password'
                required
                name='password'
                value={password}
            />

            <label>Confirm password</label>
            <input
                onChange={handlChenge}
                type='password'
                required
                name='confirmPassword'
                value={confirmPassword}
            />
            <button type='submit'>Sign Up</button>
        </form>
    </div>
    )
}

export default SingUpForm;