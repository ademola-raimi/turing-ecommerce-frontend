import React, { Component } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, browserHistory } from 'react-router';
import _ from 'lodash';
import R from 'ramda';
import api from '../config/config.js';
import { fetchOrders } from '../actions/Order';
import Navbar from './Navbar';
import { isLoggedIn } from '../helpers/helper';

class Orders extends Component {
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
        this.props.actions.fetchOrders();
    }

    renderRedirect = () => {
        return (
                browserHistory.push('/login')
            )
    }

    renderOrders = (order,index)=>{
        return (
            <div className='col-md-9' key={index}>
                
                    <div class="panel panel-default">
                        <Link to={`/order/${order.order_id}`}>
                        <div class="panel-heading">
                            <h3 class="panel-title">Order Id: {order.order_id}</h3>
                        </div>
                        
                        <div class="panel-body">
                        Order amount: {order.total_amount}
                        </div>
                        </Link>
                    </div>
                
            </div>
        );
    };

    render() {
        const { orders } = this.props.OrderStore;

        return(
            <div className="view-container">
                <div className="container">
                    <Navbar/>
                    <h2>Your Orders</h2>
                    <div className="row">
                        {
                            orders.map((order,index)=>{
                                return this.renderOrders(order,index);
                            })
                        }
                    </div>
                </div>
            </div>            
        )
    };
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
                fetchOrders
            },
            dispatch
        ),
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(Orders);
