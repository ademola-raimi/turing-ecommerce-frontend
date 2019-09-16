import React, { Component } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, browserHistory } from 'react-router';
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
            <div className='col-md-12' key={index}>
                
                    <div className="panel panel-default">
                        <Link to={`/order/${order.order_id}`}>
                            <div className="panel-heading">
                                <h3 className="panel-title">Order Id: {order.order_id}</h3>
                            </div>
                            <div className="panel-body">
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
                    <div className="row">
                        <Navbar/>
                    </div>
                    <div className="row">
                        <div className='col-md-12'>
                            <h2 className="text-center-sm">Your Order</h2>
                        </div>
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
