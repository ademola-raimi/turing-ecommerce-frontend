import './main.css'
import React from 'react';
import ReactDOM from 'react-dom';
import store from './store/configureStore';
import {Provider} from 'react-redux';
import {browserHistory,Router,Route} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import Layout from './Containers/Layout';
import Phones from './Containers/Phones';
import Phone from './Containers/Phone';
import Basket from './Containers/Basket';
import Products from './Containers/Products';
import ProductDetails from './Containers/ProductDetails';

const history = syncHistoryWithStore(browserHistory,store);
const jsx = (
    <Provider store={store}>
       <Router history={history}>
            <Route component={Layout}>
                <Route exact path="/" component={Products}/>
                <Route path='/products' component={Products}></Route>
                <Route path='/phones' component={Phones}></Route>
                <Route path='/categories/:id' component={Phones} />
            </Route>
            <Route exact path='/product/:id' component={ProductDetails}></Route>
            <Route path="/basket" component={Basket} />
       </Router>
    </Provider>
);

ReactDOM.render(jsx,document.getElementById('root'));

