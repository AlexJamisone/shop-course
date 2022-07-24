import { compose, applyMiddleware, createStore} from 'redux'

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import logger from 'redux-logger'
import { rootReducer } from './root-reducer'
// import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import { rootSaga } from './root-saga'


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
}


const sagaMiddleware = createSagaMiddleware()

const persistedReducer = persistReducer(persistConfig, rootReducer) 

const middlewars = [process.env.NODE_ENV !== 'production' && logger,
    sagaMiddleware
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

sagaMiddleware.run(rootSaga)

export const persistor = persistStore(store)
