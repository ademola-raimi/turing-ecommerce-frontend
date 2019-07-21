import React, { Component } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, browserHistory } from 'react-router';
import _ from 'lodash';
import api from '../config/config.js';
import { fetchOrder } from '../actions/Order';
import { isLoggedIn } from '../helpers/helper';
import Navbar from './Navbar';

class OrderDetails extends Component {
    constructor (props) {
        super(props);
        this.state = {
            ...props,
            modalOpen: false,
            searchTerm: null,
            selected: [],
            confirmDelete: false
        };
    }

    componentDidMount() {
        if (!isLoggedIn()) {
            this.renderRedirect();
            return;
        }

        this.props.actions.fetchOrder(this.props.params.id);
    }

    renderRedirect = () => {
        return (
            browserHistory.push('/login')
        )
    }

    renderContent = (order)=>{
        return(
            <div class="panel panel-default">
              <div class="panel-heading">Order Id: <br/>{order.order_id}</div>
              <div class="panel-body">
                <p>Total amount: <br/>{order.total_amount}</p>
              </div>

              <ul class="list-group">
                <li class="list-group-item">Created At: {order.created_on}</li>
                <li class="list-group-item">Shipped On: {order.shipped_on}</li>
                <li class="list-group-item">Comment: {order.comment}</li>
                <li class="list-group-item">{order.tax_id == 1 ? "Paid Tax" : "No Tax"}</li>
                <li class="list-group-item"></li>
              </ul>
            </div>
        );
    };


    render(){
        const { order } = this.props.OrderStore;
        return(
            <div className='view-container'>
                <div className='container'>
                    <Navbar/>
                    <h2>Order Details</h2>
                    <div className="row">
                    <div className='col-md-9'>
                        {order && this.renderContent(order)}
                    </div>
                    </div>
                </div>
            </div>      

        )};
};

function mapStateToProps(state) {
    return {
        OrderStore: state.Order,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(
            {
                fetchOrder
            },
            dispatch
        ),
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(OrderDetails);
