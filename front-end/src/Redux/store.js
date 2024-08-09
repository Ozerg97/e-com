import { combineReducers, createStore, applyMiddleware } from 'redux';
import storage from 'redux-persist/lib/storage';
import  { persistStore, persistReducer } from 'redux-persist';
import { productListReducer, productReducer } from './Reducers/Products';
import {thunk} from 'redux-thunk';
import { userForgotPasswordReducer, userLoginReducer, userRegisterReducer, userResetPasswordReducer } from './Reducers/User';
import { cartReducer } from './Reducers/Cart';
import { orderDetailReducer, orderListReducer, orderPaymentReducer, orderReducer } from './Reducers/Order';

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
    userRegisterReducer,
    cartReducer,
    
    orderReducer,
    orderDetailReducer,
    orderPaymentReducer,
    orderListReducer,
    userForgotPasswordReducer,
    userResetPasswordReducer
})


const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);