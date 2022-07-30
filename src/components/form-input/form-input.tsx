import { FC, InputHTMLAttributes } from 'react'
import './form-input.scss'

type FormInputProps = {
	label?: string
	value: string
} & InputHTMLAttributes<HTMLInputElement>

const FormInput: FC<FormInputProps> = ({ label, ...otherProps }) => {
	return (
		<div className="group">
			<input className="form-input" {...otherProps} />
			{label && (
				<label
					className={`${
						otherProps.value.length ? `shrink` : ''
					} form-input-label`}
				>
					{label}
				</label>
			)}
		</div>
	)
}

export default FormInput
