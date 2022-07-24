import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import Button from '../button/button';
import FormInput from '../form-input/form-input';
import { googleSignInStart, emailSignInStart } from '../../store/user/user.action';

import './sign-in.scss'
const defaltFormField = {
	email: '',
	password: '',
}

const SignInForm = () => {
	const dispatch = useDispatch()
	const [formFields, setFormFields] = useState(defaltFormField);
	const {email, password} = formFields

	const resetFields = () => {
		setFormFields(defaltFormField)
	}

	const signInWithGoogle = async () => {
		dispatch(googleSignInStart())
	}

	const handlSubmit = async (e) => {
		e.preventDefault()

		try {
			dispatch(emailSignInStart(email, password))
			resetFields()
		} catch (error) {
			switch (error.code) {
				case 'auth/wrong-password':
					alert('incorrect password for email')
					break;
				case 'auth/user-not-found':
					alert('no user associated with this email')
					break
				default:
					console.log(error);;
			}
		}
	}

	const handlChenge = (e) => {
		const { name, value } = e.target;

		setFormFields({...formFields, [name]: value})
	}

	return (
		<div className='sign-in-container'>
			<h2>I already have an account</h2>
			<span>Sign in with youre email and password</span>
			<form onSubmit={handlSubmit}>
				<FormInput
					onChange={handlChenge}
					label='Email'
					type='email'
					required
					name='email'
					value={email}
					/>
				<FormInput
					label='Password'
					type='password'
					required
					name='password'
					value={password}
					onChange={handlChenge}
				/>
				<div className="buttons-container">
				<Button 
					type='submit'
					children='Sign In'
				/>
				<Button
					onClick={signInWithGoogle}
					children='Sign In With Google'
					buttonType='google'
					type='button'
				/>
				</div>
			</form>
		</div>
	)
}

export default SignInForm