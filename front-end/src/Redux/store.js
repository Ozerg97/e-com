import { version} from 'mongoose';

import { combineReducers, createStore } from 'redux';
 
import storage from 'redux-persist/lib/storage';
import  { persistStore, persistReducer } from 'redux-persist';
import { ProductListReducer, ProductReducer } from './Reducers/Products';


const persistConfig = {
    key: 'root',
    storage: storage,
    version: 1 
}
const rootReducer = combineReducers({
    // add reducers here
    ProductListReducer,
    ProductReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default = createStore(persistedReducer);

export let persistor = persistStore(store);