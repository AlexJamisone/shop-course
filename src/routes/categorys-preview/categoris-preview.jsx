import { useContext } from "react"
import CategoryPreview from "../../components/category-preview/category-preview"
import { CategoriesContext } from "../../context/categories.context"

const CategorisPreview = () => {
    const {categoriesMap} = useContext(CategoriesContext)
    return (
        <>
        {
            Object.keys(categoriesMap).map(title => {
                const products = categoriesMap[title]
                return <CategoryPreview key={title} title={title} products={products}/>
            })
        }
        </>
    )
}

export default CategorisPreview