import {createStore, combineReducers,applyMiddleware,compose} from 'redux';
import phoneReducer from '../reducers/phone';
import productReducer from '../reducers/Products';
import PhonesPage from '../reducers/PhonesPage';
import PhonePage from '../reducers/PhonePage';
import {routerReducer} from 'react-router-redux';
import Basket from '../reducers/Basket';
import Categories from '../reducers/Categories';

import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas/rootSaga';
import * as ProductSagas from '../sagas/Products';
const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    combineReducers({
        routing:routerReducer,
        phone: phoneReducer,
        Product: productReducer,
        PhonesPage: PhonesPage,
        PhonePage: PhonePage,
        Basket:Basket,
        Categories: Categories
    }),composeEnhancers(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(rootSaga);
export default store;