import React, { Component } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, browserHistory } from 'react-router';
import _ from 'lodash';
import api from '../config/config.js';
import { registerCustomer } from '../actions/Customers'
import { validateEmail } from '../helpers/helper';

class Register extends Component {
    constructor (props) {
        super(props);
        this.state = {
            ...props,
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            errors: {}
        };

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleNameChange(event) {
        this.setState({name: event.target.value});
    }

    handleEmailChange(event) {
        this.setState({email: event.target.value});
    }

    handlePasswordChange(event) {
        this.setState({password: event.target.value});
    }

    handleConfirmPasswordChange(event) {
        this.setState({confirmPassword: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log('validation sucess: ',this.handleValidation());
        if (this.handleValidation()) {
          let payload={
            "name":this.state.name,
            "email":this.state.email,
            "password":this.state.password,
          }
          console.log('payload: ',payload);
          console.log(this.props.actions)
          this.props.actions.registerCustomer(payload);
        }
      }

    handleValidation() {
        let fields = this.state;
        // let room = this.state.room_id;
        let errors = {};
        let formIsValid = true;

        if (!fields["name"]) {
            formIsValid = false;
            errors["name"] = 'Name is required.';
        }
        if (!fields["email"]) {
            formIsValid = false;
            errors["email"] = 'Email is required.';
        }
        if (fields["email"] && !validateEmail(fields["email"])) {
            formIsValid = false;
            errors["email"] = 'Email is invalid.';
        }
        if (!fields["password"]) {
            formIsValid = false;
            errors["password"] = 'Password is required.';
        }
        if (!fields["confirmPassword"]) {
            formIsValid = false;
            errors["password"] = 'Confirm Password is required.';
        }
        if (fields["confirmPassword"] && fields["password"] && (fields["password"] !== fields["confirmPassword"])) {
            formIsValid = false;
            errors["confirmPassword"] = 'Password do not match.';
        }

        this.setState({errors: errors});
        return formIsValid;
    }

  renderRedirect() {
      if (this.props.CustomerStore.registerSuccess) {
            return (
                browserHistory.push('/login')
            )
       } else {
          return null
      }
  }

    render() {
        return (
            <div className="view-container">
                <div className="container">
                    <h2>Register</h2>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" className="form-control" name="name"  value={this.state.name} onChange={this.handleNameChange} type="name" id="name" autoComplete="current-name" />
                            <span className="form-error"><strong>{this.state.errors["name"]}</strong></span>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input type="email" className="form-control" id="email" name="email"   value={this.state.email} onChange={this.handleEmailChange} autoComplete="email" autoFocus />
                            <span className="form-error"><strong>{this.state.errors["email"]}</strong></span>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input type="password" className="form-control" name="password"  value={this.state.password} onChange={this.handlePasswordChange} type="password" id="password" autoComplete="current-password" />
                            <span className="form-error"><strong>{this.state.errors["password"]}</strong></span>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword2">Confirm Password</label>
                            <input type="password" className="form-control" name="confirm-password"  value={this.state.confirmPassword} onChange={this.handleConfirmPasswordChange} type="password" id="password" autoComplete="current-password" />
                            <span className="form-error"><strong>{this.state.errors["confirmPassword"]}</strong></span>
                        </div>
                        <div className="">
                            <p>If you already have an account, please login <Link to="/login" >here</Link> </p>
                            <p>Click <Link to="/" >here</Link> to go back to  the home page</p>
                        </div>
                        <button type="submit" className="btn btn-default">Submit</button>
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
                registerCustomer
            },
            dispatch
        ),
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(Register);
