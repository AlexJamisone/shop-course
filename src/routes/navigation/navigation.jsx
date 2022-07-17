import React, {useContext} from "react";
import { Outlet, Link } from "react-router-dom";
import { useSelector } from 'react-redux'

import CartIcon from "../../components/cart-icon/cart-icon";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown";

import { ReactComponent as Logo } from '../../assets/logo.svg'

import { CartContext } from "../../context/cart.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import { selectCurrentUser } from "../../store/user/user.selector";

import './navigation.scss'

const Navigation = () => {
    const currentUser = useSelector(selectCurrentUser)
    const { isCartOpen } = useContext(CartContext)
    return (
        <>
            <div className="navigation">
                <Link className="logo-container" to='/'>
                    <Logo className="logo"/>
                </Link>
                <div className="nav-links-container">
                    <Link className="nav-link" to='/shop'>
                        SHOP
                    </Link>
                    {
                        currentUser ? 
                            (<span className="nav-link" onClick={signOutUser}>SING OUT</span>)
                            : 
                            (<Link className="nav-link" to='/auth'>SIGN IN</Link>)   
                    }
                    <CartIcon/>
                </div>
                {isCartOpen && (<CartDropdown/>)}
            </div>
            <Outlet/>
    </>
    )
}

export default Navigation;