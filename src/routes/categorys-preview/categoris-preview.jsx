import { useSelector } from "react-redux"
import CategoryPreview from "../../components/category-preview/category-preview"
import { selectCategoriesMap, selectCategoriesIsLoading } from "../../store/categories/categories.selector"
import Spinner from "../../components/spinner/spinner"

const CategorisPreview = () => {
    const categoriesMap = useSelector(selectCategoriesMap)
    const isLoading = useSelector(selectCategoriesIsLoading)
    return (
        <>
        { isLoading ? (
            <Spinner mainLoad='spinner-container'/>
        ) :
            (Object.keys(categoriesMap).map(title => {
                const products = categoriesMap[title]
                return <CategoryPreview key={title} title={title} products={products}/>
            }))
        }
        </>
    )
}

export default CategorisPreview