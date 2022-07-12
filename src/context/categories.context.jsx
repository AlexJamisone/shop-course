import { createContext, useState, useEffect } from "react";

import { getCategoriesAndDocument } from "../utils/firebase/firebase.utils.js";


export const CategoriesContext = createContext({
    categoriesMap: {},
})



export const CategoriesProvider = ({children}) => {
    const [categoriesMap, setCategoriesMap] = useState({});

    useEffect(() => {
        const getCategorysMap = async () => {
            const categoryMap = await getCategoriesAndDocument()
            console.log(categoryMap)
            setCategoriesMap(categoryMap)
        }
        getCategorysMap()
    }, [])

    const value = {categoriesMap}

    return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
}