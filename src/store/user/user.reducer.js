import { USER_ACTION_TYPE } from "./user.types";

const INITIAL_STATE = {
    currentUser: null,
    isLoading: false,
    error: null
}

export const userReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action
    
    switch(type) {
        case USER_ACTION_TYPE.SING_IN_SUCCESS:
            return {
                ...state,
                currentUser: payload
            }
        case USER_ACTION_TYPE.SING_IN_FAILD:
            return {
                ...state,
                error: payload
            }

        default:
            return state;
    }
}