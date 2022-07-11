import { useContext } from 'react'
import Button from '../button/button'


import { CartContext } from '../../context/cart.context'
import './product-card.scss'

const ProductCard = ({ product }) => {
    const {name, imageUrl, price} = product;
    const { addItemToCart } = useContext(CartContext)

    const addProducToCart = () => addItemToCart(product)

    return (
        <div className='product-card-container'>
            <img src={imageUrl} alt={`${name}`} />
            <div className="footer">
                <span className="name">{name}</span>
                <span className="price">{price}</span>
            </div>
            <Button 
                buttonType='inverted'
                onClick={addProducToCart}
                children='Add to Card'
            />
        </div>
    )
}

export default ProductCard