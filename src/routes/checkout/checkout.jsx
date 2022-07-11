import { useContext } from 'react'
import { CartContext } from '../../context/cart.context'



import './checkout.scss'

const Checkout = () => {
    const {cartItems, addItemToCart} = useContext(CartContext)
    return (
        <div>
            <div>
                {
                    cartItems.map((cartItem) => {
                        const {id, name, quantity } = cartItem
                        return (
                            <div key={id}>
                                <h2>{name}</h2>
                                <span>{quantity}</span>
                                <br/>
                                <span>dec</span>
                                <br/>
                                <span onClick={() => addItemToCart(cartItem)}>inc</span>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Checkout