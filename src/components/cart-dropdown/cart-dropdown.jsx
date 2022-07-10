import Button from '../button/button'
import './cart-dropdown.scss'

const CartDropdown = () => {
  return (
    <div className='cart-dropdown-container'>
        <div className="cart-items"/>
        <Button children='Go to Checkout'/>
    </div>
  )
}

export default CartDropdown