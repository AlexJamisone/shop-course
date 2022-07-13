import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { CartContext } from '../../context/cart.context'
import Button from '../button/button'
import CartItem from '../cart-item/cart-item'
import './cart-dropdown.scss'


const CartDropdown = () => {
	const { cartItems } = useContext(CartContext)
	const navigate = useNavigate()

	const goToCheckoutHendler = () => {
		navigate('/checkout')
	}

	return (
		<div className='cart-dropdown-container'>
			<div className="cart-items">
				{
					cartItems.length ? (
						cartItems.map(item => <CartItem key={item.id} cartItem={item}/>)
					) : (
						<span className='cart-items-emptyMessage'>Youre Cart is Empty</span>
					)
				}
				
			</div>
			<Button 
				children='Go to Checkout'
				onClick={goToCheckoutHendler}
			/>
		</div>
	)
}

export default CartDropdown