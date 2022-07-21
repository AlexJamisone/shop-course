import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchCategoriesAsync } from '../../store/categories/categories.action'
import { Routes, Route } from 'react-router-dom'
import CategorisPreview from '../categorys-preview/categoris-preview'
import Category from '../category/category'

import './shop.scss'

const Shop = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchCategoriesAsync())
    }, [])

    return (
            <Routes>
                <Route index element={<CategorisPreview/>}/>
                <Route path=':category' element={<Category/>}/>
            </Routes>
    )
}

export default Shop