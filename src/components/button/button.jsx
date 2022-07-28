import './button.scss'
import Spinner from '../spinner/spinner'

export const BUTTON_TYPE_CLASSES = {
	google: 'google-sign-in',
	inverted: 'inverted',
}

const Button = ({ children, buttonType, isLoading, ...otherProps }) => {
	return (
		<button
			className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
			{...otherProps}
			disabled={isLoading}
		>
			{isLoading ? <Spinner modifi="button-spinner" /> : children}
		</button>
	)
}

export default Button
