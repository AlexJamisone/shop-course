import { createContext, useState } from "react";

import PRODUTS from '../shop-data.json'

export const ProductsContext = createContext({
    products: [],

})

export const ProductsProvider = ({children}) => {
    const [products, setProducts] = useState(PRODUTS);
    const value = {products}

    return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
}