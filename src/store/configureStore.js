import {createStore, combineReducers,applyMiddleware,compose} from 'redux';
import productReducer from '../reducers/Products';
import {routerReducer} from 'react-router-redux';
import Basket from '../reducers/Basket';
import Categories from '../reducers/Categories';
import ShoppingCartReducer from '../reducers/ShoppingCart';
import CustomerReducer from '../reducers/Customers';
import OrderReducer from '../reducers/Order';
import ShippingReducer from '../reducers/Shipping';

import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    combineReducers({
        routing:routerReducer,
        Product: productReducer,
        Basket:Basket,
        Categories: Categories,
        ShoppingCart: ShoppingCartReducer,
        Customer: CustomerReducer,
        Shipping: ShippingReducer,
        Order: OrderReducer
    }),composeEnhancers(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(rootSaga);
export default store;
