import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
// import { FormattedMessage } from 'react-intl'
// import { NotificationSnackbar } from './components';
// components
// import Navigation from './Navigation';
import { withRouter } from 'react-router-dom';

import Layout from './Containers/Layout';
import Phones from './Containers/Phones';
import Phone from './Containers/Phone';
import Basket from './Containers/Basket';
import Products from './Containers/Products';
import ProductDetails from './Containers/ProductDetails';
import {browserHistory,Router,Route} from 'react-router';
// import { isLoggedIn } from './helpers/helper';

// import './App.scss';

//material-ui
import Grid from '@material-ui/core/Grid';

class App extends Component {

    componentDidMount() {
        // if (isLoggedIn()) {

        // }
    }

   // renderSnackbar() {
   //    const { open, type, message, messageId } = this.props.NotificationStore;
   //    let displayMessage = messageId !== "" ? messageId : message;
   //    return (
   //      <NotificationSnackbar
   //          open={open}
   //          variant={type}
   //          message={displayMessage}
   //      />
   //    )
   //  }

  render() {
    return (
        <div className="App">
            <div className="main-container">
                <Grid container spacing={0} justify="center" alignItems="center" className="main-container-grid">
                    <Grid item xs={12} sm={12} md={8} lg={8} className="main-container-grid">
                        <Grid container alignItems="center" justify="center" className="main-container-grid">
                            <Router history={history}>
                                <Route component={Layout}>
                                    <Route path='/phones' component={Phones}></Route>
                                    <Route path='/products' component={Products}></Route>
                                    <Route path='/categories/:id' component={Phones} />
                                </Route>
                                <Route exact path="/product/:id" component={ProductDetails} />
                                <Route path="/Phones/:id" component={Phone} />
                                <Route path="/basket" component={Basket} />
                                
                           </Router>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    NotificationStore: state.NotificationStore
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {

      },
      dispatch
    )
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
