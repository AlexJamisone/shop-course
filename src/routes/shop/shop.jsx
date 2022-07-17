import { Routes, Route} from 'react-router-dom'
import CategorisPreview from '../categorys-preview/categoris-preview'
import Category from '../category/category'

import './shop.scss'

const Shop = () => {
    return (
            <Routes>
                <Route index element={<CategorisPreview/>}/>
                <Route path=':category' element={<Category/>}/>
            </Routes>
    )
}

export default Shop