import { useDispatch, useSelector } from "react-redux";
import {
	clearItemFromCart,
	addItemToCart,
	removeItemFromCart,
} from "../../store/cart/cart.action";
import { selecCartItems } from "../../store/cart/cart.selection";
import "./checkout-item.scss";

const CheckoutItem = ({ cartItem }) => {
	const dispatch = useDispatch();
	const { name, imageUrl, price, quantity } = cartItem;
	const cartItems = useSelector(selecCartItems);

	const clearItemHandler = () =>
		dispatch(clearItemFromCart(cartItems, cartItem));
	const addItemHendler = () => dispatch(addItemToCart(cartItems, cartItem));
	const removeItemHandler = () =>
		dispatch(removeItemFromCart(cartItems, cartItem));

	return (
		<div className="checkout-item-container">
			<div className="image-container">
				<img src={imageUrl} alt={`${name}`} />
			</div>
			<span className="name">{name}</span>
			<span className="quantity">
				<div className="arrow" onClick={removeItemHandler}>
					&#10094;
				</div>
				<span className="value">{quantity}</span>
				<div className="arrow" onClick={addItemHendler}>
					&#10095;
				</div>
			</span>
			<span className="price">{price}</span>
			<div className="remove-btn" onClick={clearItemHandler}>
				&#10005;
			</div>
		</div>
	);
};

export default CheckoutItem;
