import React, { Component } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, browserHistory } from 'react-router';
import _ from 'lodash';
import { fetchToken } from '../actions/Customers';
import {NotificationContainer, NotificationManager} from 'react-notifications';

class Login extends Component {
    constructor (props) {
        super(props);
        this.state = {
            ...props,
            email: '',
            password: '',
            show: false
        };

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    shouldComponentUpdate (nextProps, nextState, nextContent) {
        if (!_.isEqual(nextProps.CustomerStore.hasError, this.props.CustomerStore.hasError)) {
            NotificationManager.error('Authentication failed', 'Auth');
        }

        if (!_.isEqual(nextProps.CustomerStore.registerSuccess, this.props.CustomerStore.registerSuccess)) {
            if (nextProps.CustomerStore.registerSuccess) {
              NotificationManager.success('Registration successfull, please login to proceed', 'Auth');
            }
        }

        if (!_.isEqual(nextProps.CustomerStore.authenticated, this.props.CustomerStore.authenticated)) {
            if (nextProps.CustomerStore.authenticated) {
              NotificationManager.success('Authenticated, redirecting...', 'Auth');
            }
        }

        return true;
    }

    handleEmailChange(event) {
      this.setState({email: event.target.value});
    }

    handlePasswordChange(event) {
      this.setState({password: event.target.value});
    }

    handleSubmit(event) {
      event.preventDefault();
      let payload={
        "email":this.state.email,
        "password":this.state.password,
      }
      this.props.actions.fetchToken(payload);
    }

    renderRedirect() {
        const { authenticated } = this.props.CustomerStore
        if (authenticated) {
              return (
                  browserHistory.push('/')
              )
        }
    }

    render() {
        return (
            <div className="view-container">
                <div className="container">
                    <h2>Login</h2>
                    <NotificationContainer/>
                    <form onSubmit={this.handleSubmit}>
                      <div className="form-group">
                          <label htmlFor="Email">Email address</label>
                          <input type="email" className="form-control" id="Email" placeholder="Email" name="email"   value={this.state.email} onChange={this.handleEmailChange} autoComplete="email" autoFocus />
                      </div>
                      <div className="form-group">
                          <label htmlFor="Password">Password</label>
                          <input type="password" className="form-control" placeholder="Password" name="password"  value={this.state.password} onChange={this.handlePasswordChange} type="password" id="password" autoComplete="current-password" />
                      </div>
                      <div className="">
                          <p>If you don't already have an account, please register <Link to="/register" >here</Link> </p>
                          <p>Click <Link to="/" >here</Link> to go back to  the home page</p>
                      </div>
                      <button type="submit" className="btn btn-default">Sign in</button>
                    </form>
                    { this.renderRedirect() }
                </div>
            </div>
        );
    };
};
  
function mapStateToProps(state) {
    return {
        CustomerStore: state.Customer,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(
            {
                fetchToken
            },
            dispatch
        ),
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);
