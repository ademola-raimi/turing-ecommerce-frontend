import React, { Component } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, browserHistory } from 'react-router';
import _ from 'lodash';
import api from '../config/config.js';
import { allCarts, emptyCart, totalPrice, removeProduct, updateQuantity } from '../actions/ShoppingCart';
import Navbar from './Navbar';

class Basket extends Component {
    constructor (props) {
        super(props);
        this.state = {
            ...props,
            modalOpen: false,
            totalAmount: 0,
            totalCartItem: 0,
            quantityInput: 0,
            itemId: ""
        };
        this.handleQuantity = this.handleQuantity.bind(this);
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

        if (!_.isEqual(nextProps.ShoppingCartStore.totalAmount, this.props.ShoppingCartStore.totalAmount)) {
            console.log(nextProps.ShoppingCartStore.totalAmount)
            this.setState({
                totalAmount: nextProps.ShoppingCartStore.totalAmount
            });
        }

        return true;
    }

    handleQuantity = (val, itemId, price) => {
        this._input.focus();
        const newValue = parseInt(this._input.value) + val
        if (0 < newValue && newValue < 21 ) {
            this._input.value = newValue
            this.setState({
                quantityInput: newValue,
                totalAmount: price * newValue,
                itemId: itemId
            })
        }
    }

    renderContent = () => {
        const {isBasketEmpty, allCarts, totalAmount} = this.props.ShoppingCartStore;
        const totalPrice = (this.state.totalAmount == 0) ?  totalAmount : parseFloat(this.state.totalAmount).toFixed(2)
        const self = this;
        return (
            <div>
                {isBasketEmpty && <div> Your shopping cart is empty </div>}
                <div className="table-responsive">
                    <table className="table-bordered table-striped table-condensed cf">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Action</th>
                            </tr>
                        </thead>
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
                                    <td>
                                        <div className="quantity">
                                        <div class="input-group">
                                          <span class="input-group-btn">
                                            <button type="button" class="btn btn-default btn-number"  data-type="minus" onClick={()=>this.handleQuantity(-1, cart.item_id, cart.price)} data-field="quant[1]">
                                              <span class="glyphicon glyphicon-minus"></span>
                                            </button>
                                          </span>
                                          <input type="number" 
                                            class="form-control input-number"
                                            readOnly 
                                            defaultValue={cart.quantity}
                                            ref={
                                                function(el) {
                                                    self._input = el;
                                                }
                                            }
                                           />
                                          <span class="input-group-btn">
                                            <button type="button" class="btn btn-default btn-number" data-type="plus" onClick={()=>this.handleQuantity(1, cart.item_id, cart.price)} data-field="quant[1]">
                                              <span class="glyphicon glyphicon-plus"></span>
                                            </button>
                                          </span>
                                          </div>
                                        </div>
                                    </td>

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
                    (!isBasketEmpty) && (
                        <div className="row">
                            <div className="pull-right total-user-checkout">
                                <b>Total:</b>
                                ${totalPrice}
                            </div>
                        </div>
                    )
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
        const {itemId, quantityInput} = this.state
        this.props.actions.updateQuantity(itemId, quantityInput)
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
                    (!isBasketEmpty) && (
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
                    )
                }
            </div>
        );
    };

    render() {
        return(
            <div className="view-container">
                <div className="container">
                    <Navbar/>
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
                totalPrice,
                updateQuantity
            },
            dispatch
        ),
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(Basket);