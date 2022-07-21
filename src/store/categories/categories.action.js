import { CATEGORIES_ACTION } from "./categories.types";
import { createAction } from "../../utils/reducer/reducer.utils";
import { getCategoriesAndDocument } from "../../utils/firebase/firebase.utils";

export const fetchCategoriesStart = () => 
    createAction(CATEGORIES_ACTION.FETCH_CATEGORIES_START)

export const fetchCategoriesSuccess = (categoriesArray) => 
    createAction(CATEGORIES_ACTION.FETCH_CATEGORIES_SUCCESS, categoriesArray)
    
export const fetchCategoriesFailed = (error) => 
    createAction(CATEGORIES_ACTION.FETCH_CATEGORIES_FAILED, error)


export const fetchCategoriesAsync = () => async (dispatch) => {
    dispatch(fetchCategoriesStart())
    try {
        const categoriesArray = await getCategoriesAndDocument('categories')
        dispatch(fetchCategoriesSuccess(categoriesArray))
    } catch (error) {
        dispatch(fetchCategoriesFailed(error))
    }
}  
