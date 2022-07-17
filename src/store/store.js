import { compose, applyMiddleware, createStore} from 'redux'
import logger from 'redux-logger'
import { rootReducer } from './root-reducer'

const middlewars = [logger]

const composeEnhancers = compose(applyMiddleware(
    ...middlewars
))

export const store = createStore(
    rootReducer,
    undefined,
    composeEnhancers
)
