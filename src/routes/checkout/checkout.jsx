import { useSelector } from 'react-redux/es/exports'
import { selecCartItems, selectCartTotal } from '../../store/cart/cart.selection'
import CheckoutItem from '../../components/checkout-item/checkout-item'
import PaymentForm from '../../components/payment-form/payment-form'

import './checkout.scss'

const headerItem = ['Product', 'Description', 'Quantity', 'Price', 'Remove']

const Checkout = () => {
    const cartItems = useSelector(selecCartItems)
    const cartTotal = useSelector(selectCartTotal)
    return (
        <div className='checkout-container'>
            <div className="checkout-header">
                {headerItem.map((item, index) => (
                    <div key={index} className="header-block">
                        <span>{item}</span>
                    </div>
                ))}
            </div>
            {
                cartItems.length ? (
                    cartItems.map((cartItem) => (
                            <CheckoutItem key={cartItem.id} cartItem={cartItem}/> 
                ))) 
                : (
                    <span className="checkout-emptyMessage">Youre Cart Empty</span>
                )
            }
            {
            }
            <span className='total'>Total: ${cartTotal}</span>
            <PaymentForm/>
        </div>
    )
}

export default Checkout