import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import Button from '../button/button'

import './payment-form.scss'

const PaymentForm = () => {
	const stripe = useStripe()
	const elements = useElements()

	const paymentHendler = async (e) => {
		e.prefentDefault()

		if(!stripe || !elements) {
			return;
		}
		
	}

	return (
		<div className='payment-from-container'>
			<h2>Credit Card Payment</h2>
			<div className="payment-form-input">
				<CardElement/>
				<Button children='Pay now' buttonType='inverted'></Button>
			</div>
		</div>
	)
}

export default PaymentForm