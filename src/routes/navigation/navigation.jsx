import { Outlet, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import CartIcon from '../../components/cart-icon/cart-icon'
import CartDropdown from '../../components/cart-dropdown/cart-dropdown'

import { ReactComponent as Logo } from '../../assets/logo.svg'

import { selectCurrentUser } from '../../store/user/user.selector'
import { selectIsCartOpen } from '../../store/cart/cart.selection'

import { signOutStart } from '../../store/user/user.action'

import './navigation.scss'

const Navigation = () => {
	const dispatch = useDispatch()
	const currentUser = useSelector(selectCurrentUser)
	const isCartOpen = useSelector(selectIsCartOpen)
	const signOutUser = () => dispatch(signOutStart())
	return (
		<>
			<div className="navigation">
				<Link className="logo-container" to="/">
					<Logo className="logo" />
				</Link>
				<div className="nav-links-container">
					<Link className="nav-link" to="/shop">
						SHOP
					</Link>
					{currentUser ? (
						<span className="nav-link" onClick={signOutUser}>
							SING OUT
						</span>
					) : (
						<Link className="nav-link" to="/auth">
							SIGN IN
						</Link>
					)}
					<CartIcon />
				</div>
				{isCartOpen && <CartDropdown />}
			</div>
			<Outlet />
		</>
	)
}

export default Navigation
