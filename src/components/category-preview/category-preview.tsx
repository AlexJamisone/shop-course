import { FC } from 'react'
import { CategoryItem } from '../../store/categories/categories.types'
import { Link } from 'react-router-dom'
import ProductCart from '../product-card/product-card'

import './category-preview.scss'

type CategorisPreview = {
	title: string
	products: CategoryItem[]
}

const CategoryPreview: FC<CategorisPreview> = ({ title, products }) => {
	return (
		<div className="category-preview-container">
			<h2>
				<Link to={title} className="title">
					{title.toUpperCase()}
				</Link>
			</h2>
			<div className="preview">
				{products
					.filter((_, idx) => idx < 4)
					.map((product) => (
						<ProductCart key={product.id} product={product} />
					))}
			</div>
		</div>
	)
}

export default CategoryPreview
