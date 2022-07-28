import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import {
	selectCategoriesMap,
	selectCategoriesIsLoading,
} from '../../store/categories/categories.selector'

import Spinner from '../../components/spinner/spinner'
import { useParams } from 'react-router-dom'
import ProductCard from '../../components/product-card/product-card'

import './category.scss'

const Category = () => {
	const { category } = useParams()
	const categoriesMap = useSelector(selectCategoriesMap)
	const isLoading = useSelector(selectCategoriesIsLoading)
	const [products, setProducts] = useState(categoriesMap[category])

	useEffect(() => {
		setProducts(categoriesMap[category])
	}, [category, categoriesMap])

	return (
		<>
			<h2 className="category-title">{category}</h2>
			{isLoading ? (
				<Spinner mainLoad="spinner-container" />
			) : (
				<div className="category-container">
					{products &&
						products.map((product) => (
							<ProductCard key={product.id} product={product} />
						))}
				</div>
			)}
		</>
	)
}

export default Category
