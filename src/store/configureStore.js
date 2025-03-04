import {createStore, combineReducers,applyMiddleware,compose} from 'redux';
import productReducer from '../reducers/Products';
import {routerReducer} from 'react-router-redux';
import Categories from '../reducers/Categories';
import Departments from '../reducers/Departments';
import ShoppingCartReducer from '../reducers/ShoppingCart';
import CustomerReducer from '../reducers/Customers';
import OrderReducer from '../reducers/Order';
import ShippingReducer from '../reducers/Shipping';
import AttributesReducer from '../reducers/Attributes';

import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    combineReducers({
        routing:routerReducer,
        Product: productReducer,
        Categories: Categories,
        Departments: Departments,
        ShoppingCart: ShoppingCartReducer,
        Customer: CustomerReducer,
        Shipping: ShippingReducer,
        Order: OrderReducer,
        Attributes: AttributesReducer
    }),composeEnhancers(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(rootSaga);
export default store;
