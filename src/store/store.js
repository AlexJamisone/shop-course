import { compose, applyMiddleware, createStore} from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import logger from 'redux-logger'
import { rootReducer } from './root-reducer'
import thunk from 'redux-thunk'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
}

const persistedReducer = persistReducer(persistConfig, rootReducer) 

const middlewars = [process.env.NODE_ENV !== 'production' && logger,
    thunk
    ].filter(Boolean)
    
const composeEnhancer = (process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

const composeEnhancers = composeEnhancer(applyMiddleware(
    ...middlewars
))

export const store = createStore(
    persistedReducer,
    undefined,
    composeEnhancers
)

export const persistor = persistStore(store)
