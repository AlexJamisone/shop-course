import { useSelector } from "react-redux"
import CategoryPreview from "../../components/category-preview/category-preview"
import { selectCategoriesMap } from "../../store/categories/categories.selector"

const CategorisPreview = () => {
    const categoriesMap = useSelector(selectCategoriesMap)
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