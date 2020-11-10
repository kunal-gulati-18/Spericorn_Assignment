import {createStore,combineReducers,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {userReducer} from './Reducer/userReducer';
// const reducer=combineReducers({
//     productList:productReducer,
//     productDetailsList:productDetailsReducer,
//     cart:cartReducer
    
// });

// const cartItemsfromStorage=localStorage.getItem('cartItems')?JSON.parse(localStorage.getItem('cartItems')):[]
// const initialState={
//     cart:{
//         cartItems:cartItemsfromStorage
//     }
// }



const middleware=[thunk]
const store=createStore(userReducer,composeWithDevTools(applyMiddleware(...middleware)))

export default store;