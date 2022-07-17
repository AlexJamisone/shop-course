import { CATEGORIES_ACTION } from "./categories.types";
import { createAction } from "../../utils/reducer/reducer.utils";

export const setCategoriesMap = (categoriesMap) => 
    createAction(CATEGORIES_ACTION.SET_CATEGORIES_MAP, categoriesMap)