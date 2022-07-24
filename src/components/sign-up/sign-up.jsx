import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
import Button from '../button/button';
import FormInput from '../form-input/form-input';
import { signUpStart } from '../../store/user/user.action';

import './sing-up.scss'

const defaltformFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SingUpForm = () => {
    const dispatch = useDispatch()
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
            dispatch(signUpStart(email, password, displayName))
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
    <div className='sing-up-container '>
        <h2>Don't have an account?</h2>
        <span>Sing up with youre email and password</span>
        <form onSubmit={handlSubmit}>
            <FormInput
                label='Display name'
                onChange={handlChenge}
                type=''
                required
                name='displayName'
                value={displayName}
            />

            <FormInput
                label='Email'
                onChange={handlChenge}
                type='email'
                required
                name='email'
                value={email}
            />

            <FormInput
                label='Password'
                type='password'
                required
                onChange={handlChenge}
                name='password'
                value={password}
            />

            <FormInput
                label='Confirm Password'
                onChange={handlChenge}
                type='password'
                required
                name='confirmPassword'
                value={confirmPassword}
            />
            <Button type='submit' children='Sing up'/>
        </form>
    </div>
    )
}

export default SingUpForm;