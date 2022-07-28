import { CATEGORIES_ACTION, Category } from './categories.types'
import {
	createAction,
	Action,
	ActionWithPayload,
	withMatcher,
} from '../../utils/reducer/reducer.utils'

export type FetchCategoriesStart =
	Action<CATEGORIES_ACTION.FETCH_CATEGORIES_START>
export type FetchCategoriesSuccess = ActionWithPayload<
	CATEGORIES_ACTION.FETCH_CATEGORIES_SUCCESS,
	Category[]
>
export type FetchCategoriesFaild = ActionWithPayload<
	CATEGORIES_ACTION.FETCH_CATEGORIES_FAILED,
	Error
>

export const fetchCategoriesStart = withMatcher(() =>
	createAction(CATEGORIES_ACTION.FETCH_CATEGORIES_START)
)

export const fetchCategoriesSuccess = withMatcher(
	(categoriesArray: Category[]) =>
		createAction(
			CATEGORIES_ACTION.FETCH_CATEGORIES_SUCCESS,
			categoriesArray
		)
)

export const fetchCategoriesFailed = withMatcher((error: Error) =>
	createAction(CATEGORIES_ACTION.FETCH_CATEGORIES_FAILED, error)
)
