import { CATEGORIES_ACTION } from "./categories.types";
import { createAction } from "../../utils/reducer/reducer.utils";

export const setCategories = (categoriesArray) => 
    createAction(CATEGORIES_ACTION.SET_CATEGORIES, categoriesArray)