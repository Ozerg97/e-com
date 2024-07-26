import { combineReducers, createStore, applyMiddleware } from 'redux';
import storage from 'redux-persist/lib/storage';
import  { persistStore, persistReducer } from 'redux-persist';
import { productListReducer, productReducer } from './Reducers/Products';
import {thunk} from 'redux-thunk';
import { userLoginReducer, userRegisterReducer } from './Reducers/User';

const persistConfig = {
    key: 'root',
    storage: storage,
    version: 1 
}
const rootReducer = combineReducers({
    // add reducers here
    productListReducer,
    productReducer,
    userLoginReducer,
    userRegisterReducer
})


const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);