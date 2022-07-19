import { useDispatch, useSelector } from 'react-redux/es/exports'
import { ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg'
import { selectIsCartOpen, selectCartCount } from '../../store/cart/cart.selection'
import { setIsCartOpen } from '../../store/cart/cart.action'

import './cart-icon.scss'
const CartIcon = () => {
    const dispatch = useDispatch()
    const cartCount = useSelector(selectCartCount);
    const isCartOpen = useSelector(selectIsCartOpen)

    const toggleIsCartOpen = () => {
        dispatch(setIsCartOpen(!isCartOpen))
    }

    return (
        <div className='cart-icon-container'>
            <ShoppingIcon className='shopping-icon' onClick={toggleIsCartOpen}/>
            <span className='item-count'>{cartCount}</span>
        </div>
    )
}

export default CartIcon