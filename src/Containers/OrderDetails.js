import React, { Component } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
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
            <div className="table-responsive">
                <table className="table-striped">
                    <tbody>
                        <tr>
                            <td>Order Id:</td>
                            <td>{order.order_id}</td>
                        </tr>
                        <tr>
                            <td>Total amount:</td>
                            <td>{order.total_amount}</td>
                        </tr>
                        <tr>
                            <td>Created At:</td>
                            <td>{order.created_on}</td>
                        </tr>
                        <tr>
                            <td>Shipped On:</td>
                            <td>{order.shipped_on}</td>
                        </tr>
                        <tr>
                            <td>Comment:</td>
                            <td>{order.comment}</td>
                        </tr>
                        <tr>
                            <td>{order.tax_id === 1 ? "Paid Tax" : "No Tax"}</td>
                            <td> </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    };

    render(){
        const { order } = this.props.OrderStore;
        return(
            <div className='view-container'>
                <div className='container'>
                    <div className='row'>
                        <Navbar/>
                    </div>
                    <div className="row">
                        <div className='col-md-12'>
                            <h2 className="text-center-sm">Order Details</h2>
                        </div>
                        <div className='col-md-12'>
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
