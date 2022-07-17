import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getCategoriesAndDocument } from '../../utils/firebase/firebase.utils'
import { setCategoriesMap } from '../../store/categories/categories.action'
import { Routes, Route } from 'react-router-dom'
import CategorisPreview from '../categorys-preview/categoris-preview'
import Category from '../category/category'

import './shop.scss'

const Shop = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const getCategorysMap = async () => {
            const categoryMap = await getCategoriesAndDocument()
            dispatch(setCategoriesMap(categoryMap))
        }
        getCategorysMap()
    }, [])

    return (
            <Routes>
                <Route index element={<CategorisPreview/>}/>
                <Route path=':category' element={<Category/>}/>
            </Routes>
    )
}

export default Shop