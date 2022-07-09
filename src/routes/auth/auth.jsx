import SingUpForm from '../../components/sign-up/sign-up';
import SignInForm from '../../components/sign-in/sign-in';
import './auth.scss'

const Auth = () => {

	return (
		<div className='auth-container'>
            <SignInForm/>
            <SingUpForm/>
		</div>
	)
}

export default Auth
