import './main.css'
import React from 'react';
import ReactDOM from 'react-dom';
import store from './store/configureStore';
import {Provider} from 'react-redux';
import {browserHistory,Router,Route} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import { Layout, Basket, Products, ProductDetails, Login, Register, Checkout, Orders, OrderDetails } from './Containers';
import {Elements, StripeProvider} from 'react-stripe-elements';

const history = syncHistoryWithStore(browserHistory,store);
const jsx = (
    <Provider store={store}>
       <Router history={history}>
            <Route component={Layout}>
                <Route exact path="/" component={Products}/>
                <Route path='/products' component={Products}></Route>
                <Route path='/categories/:id' component={Products} />
            </Route>
            <Route exact path='/product/:id' component={ProductDetails}></Route>
            <Route path="/basket" component={Basket} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />

            <Route exact path="/checkout" component={Checkout} />
            <Route exact path="/orders" component={Orders} />
            <Route exact path="/order/:id" component={OrderDetails} />
       </Router>
    </Provider>
);

ReactDOM.render(jsx,document.getElementById('root'));

