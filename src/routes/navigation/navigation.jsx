import React, {useContext} from "react";
import { Outlet, Link } from "react-router-dom";

import { ReactComponent as Logo } from '../../assets/logo.svg'

import { UserContext } from "../../context/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";

import './navigation.scss'

const Navigation = () => {
    const { currentUser } = useContext(UserContext)
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
                </div>
            </div>
            <Outlet/>
    </>
    )
}

export default Navigation;