import React, { Component } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, browserHistory } from 'react-router';
import _ from 'lodash';
import api from '../config/config.js';
import { allCarts, emptyCart, totalPrice, removeProduct } from '../actions/ShoppingCart';

class Basket extends Component {
    constructor (props) {
        super(props);
        this.state = {
            ...props,
            modalOpen: false,
            totalAmount: 0,
            totalCartItem: 0
        };
    }

    componentDidMount () {
        this.props.actions.allCarts();
        this.props.actions.totalPrice();
    }

    shouldComponentUpdate (nextProps, nextState, nextContent) {
        if (!_.isEqual(nextProps.ShoppingCartStore.removeProduct, this.props.ShoppingCartStore.removeProduct)) {
            if (nextProps.ShoppingCartStore.removeProduct) {
                this.props.actions.allCarts();
            }
        }

        return true;
    }

    renderContent = () => {
        const {isBasketEmpty, allCarts, totalAmount} = this.props.ShoppingCartStore;
        return (
            <div>
                {isBasketEmpty && <div> Your shopping cart is empty </div>}
                <div className="table-responsive">
                    <table className="table-bordered table-striped table-condensed cf">
                        <tbody>
                            {allCarts.map((cart,index)=>(
                                <tr key={index}
                                    className="item-checout">
                                    <td className="first-column-checkout">
                                        <img className="img-thumbnail"
                                            src={api.cloudinary_path + cart.image}
                                            alt={cart.name}  
                                        />
                                    </td>
                                    <td>{cart.name}</td>
                                    <td>${cart.price}</td>
                                    <td>{cart.quantity}</td>
                                    <td>
                                        <span className="delete-cart"
                                        onClick={()=>this.removeProductFromBasket(cart.item_id)}></span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {
                    isBasketEmpty &&
                    <div className="row">
                        <div className="pull-right total-user-checkout">
                            <b>Total:</b>
                            ${totalAmount}
                        </div>
                    </div>
                }
            </div>
        );
    }

    cleanBasket = () => {
        this.props.actions.emptyCart();
        localStorage.removeItem('cartId');
        localStorage.removeItem('cartsInfo');
    }

    removeProductFromBasket = (itemId) => {
        this.props.actions.removeProduct(itemId);
    }

    basketCheckout = () => {
        return (
                  browserHistory.push('/checkout')
              )
    }

    renderSidebar = ()=>{
        const {isBasketEmpty, allCarts} = this.props.ShoppingCartStore;
        return (
            <div>   
                <Link
                    className="btn btn-info"
                    to="/"
                >
                <span className="glyphicon glyphicon-info-sign"/>
                <span> Continue Shopping</span>
                </Link>
                {
                    isBasketEmpty &&
                    <div>
                        <button className="btn btn-danger"
                                onClick={()=>this.cleanBasket()}        
                        >
                        <span className="glyphicon glyphicon-trash"/>
                        Clean Cart
                        </button>
                        <button
                            className="btn btn-success"
                            onClick={()=>this.basketCheckout()}
                        >
                        <span className="glyphicon glyphicon-envelope"/>
                        Checkout
                        </button>
                    </div>
                }
            </div>
        );
    };

    render() {
        return(
            <div className="view-container">
                <div className="container">
                    <div className="row">
                        <div className="col-md-9">
                            {this.renderContent()}
                        </div>
                        <div className="col-md-3 btn-user-checkout">
                            {this.renderSidebar()}
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}

function mapStateToProps(state) {
    return {
        ShoppingCartStore: state.ShoppingCart,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(
            {
                allCarts,
                emptyCart,
                removeProduct,
                totalPrice
            },
            dispatch
        ),
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(Basket);