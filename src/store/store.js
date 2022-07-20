import { compose, applyMiddleware, createStore} from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import logger from 'redux-logger'
import { rootReducer } from './root-reducer'

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['user']
}

const persistedReducer = persistReducer(persistConfig, rootReducer) 

const middlewars = [logger]

const composeEnhancers = compose(applyMiddleware(
    ...middlewars
))

export const store = createStore(
    persistedReducer,
    undefined,
    composeEnhancers
)

export const persistor = persistStore(store)
