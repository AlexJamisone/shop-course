import { FC } from 'react'
import { CategoryItem } from '../../store/categories/categories.types'
import { useDispatch, useSelector } from 'react-redux/es/exports'
import { addItemToCart } from '../../store/cart/cart.action'
import { selecCartItems } from '../../store/cart/cart.selection'
import Button, { BUTTON_TYPE_CLASSES } from '../button/button'

import './product-card.scss'

type ProductCardProps = {
	product: CategoryItem
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
	const dispatch = useDispatch()
	const { name, imageUrl, price } = product
	const cartItems = useSelector(selecCartItems)
	const addProducToCart = () => dispatch(addItemToCart(cartItems, product))

	return (
		<div className="product-card-container">
			<img src={imageUrl} alt={`${name}`} />
			<div className="footer">
				<span className="name">{name}</span>
				<span className="price">{price}</span>
			</div>
			<Button
				buttonType={BUTTON_TYPE_CLASSES.inverted}
				onClick={addProducToCart}
				children="Add to Card"
			/>
		</div>
	)
}

export default ProductCard
