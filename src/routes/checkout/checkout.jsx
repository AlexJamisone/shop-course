import { useContext } from 'react'
import { CartContext } from '../../context/cart.context'
import CheckoutItem from '../../components/checkout-item/checkout-item'

import './checkout.scss'

const headerItem = ['Product', 'Description', 'Quantity', 'Price', 'Remove']

const Checkout = () => {
    const {cartItems, cartTotal} = useContext(CartContext)
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
        </div>
    )
}

export default Checkout