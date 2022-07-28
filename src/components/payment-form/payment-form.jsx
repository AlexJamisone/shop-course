import { useState } from 'react'
import { useSelector } from 'react-redux/es/exports'

import { selectCartTotal } from '../../store/cart/cart.selection'
import { selectCurrentUser } from '../../store/user/user.selector'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import Button from '../button/button'
import { BUTTON_TYPE_CLASSES } from '../button/button'

import './payment-form.scss'

const PaymentForm = () => {
	const stripe = useStripe()
	const elements = useElements()
	const amount = useSelector(selectCartTotal)
	const currentUser = useSelector(selectCurrentUser)
	const [isProcessingPayment, setIsProcessingPayment] = useState(false)

	const paymentHendler = async (e) => {
		e.preventDefault()

		if (!stripe || !elements) {
			return
		}
		setIsProcessingPayment(true)

		const response = await fetch(
			'/.netlify/functions/create-payment-intent',
			{
				method: 'post',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ amount: amount * 100 }),
			}
		).then((res) => res.json())

		const {
			paymentIntent: { client_secret },
		} = response
		const paymentResult = await stripe.confirmCardPayment(client_secret, {
			payment_method: {
				card: elements.getElement(CardElement),
				billing_details: {
					name: currentUser ? currentUser.displayName : 'Guest',
				},
			},
		})

		setIsProcessingPayment(false)

		if (paymentResult.error) {
			alert(paymentResult.error)
		} else {
			if (paymentResult.paymentIntent.status === 'succeeded') {
				alert('Payment Successful')
			}
		}
	}

	return (
		<div className="payment-from-container">
			<form className="payment-form-input" onSubmit={paymentHendler}>
				<h2>Credit Card Payment</h2>
				<CardElement />
				<Button
					isLoading={isProcessingPayment}
					buttonType={BUTTON_TYPE_CLASSES.inverted}
				>
					Pay Now
				</Button>
			</form>
		</div>
	)
}

export default PaymentForm
