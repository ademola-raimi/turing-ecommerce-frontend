import React, { Component } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, browserHistory } from 'react-router';
import _ from 'lodash';
import api from '../config/config.js';
import { allCarts, emptyCart, totalPrice, removeProduct, updateQuantity } from '../actions/ShoppingCart';
import Navbar from './Navbar';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';

class Basket extends Component {
    constructor (props) {
        super(props);
        this.state = {
            ...props,
            modalOpen: false,
            totalAmount: 0,
            totalCartItem: 0,
            quantityInput: 0,
            itemId: "",
            loading: false,
            disabled: ""
        };
        this.textInput = React.createRef();
        this.handleQuantity = this.handleQuantity.bind(this);
    }

    componentDidMount () {
        this.props.actions.allCarts();
        this.props.actions.totalPrice();
    }

    shouldComponentUpdate (nextProps, nextState, nextContent) {
        if (!_.isEqual(nextProps.ShoppingCartStore.removeProduct, this.props.ShoppingCartStore.removeProduct)) {
            if (nextProps.ShoppingCartStore.removeProduct) {
                NotificationManager.success('Product was removed from item', 'Basket');
                this.props.actions.allCarts();
            }
        }

        if (!_.isEqual(nextProps.ShoppingCartStore.totalAmount, this.props.ShoppingCartStore.totalAmount)) {
            this.setState({
                totalAmount: nextProps.ShoppingCartStore.totalAmount,
                loading: false,
                disabled: ""
            });
        }

        if (!_.isEqual(nextProps.ShoppingCartStore.items, this.props.ShoppingCartStore.items)) {
            this.setState({
                loading: false,
                disabled: ""
            });
        }

        if (!_.isEqual(nextProps.ShoppingCartStore.hasError, this.props.ShoppingCartStore.hasError)) {
            NotificationManager.error('Something went wrong', 'Basket');
        }

        if (!_.isEqual(nextProps.ShoppingCartStore.emptyCart, this.props.ShoppingCartStore.emptyCart)) {
            if (nextProps.ShoppingCartStore.emptyCart) {
                NotificationManager.success('Item was cleared successfully', 'Basket');
            }
        }

        return true;
    }

    handleQuantity = (val, itemId, price, index) => {
        this.setState({ loading: true, disabled: "disabled" });
        const totalAmount = parseFloat(this.props.ShoppingCartStore.totalAmount);
        const newValue = parseInt(this._input[index].value) + val
        const initialPrice = (this.state.totalAmount === 0) ?  totalAmount : parseFloat(this.state.totalAmount);
        price = parseFloat(price);
        let newTotalAmount = (val === -1) ? parseFloat(initialPrice) - price : parseFloat(initialPrice) + price;
        if (0 < newValue && newValue < 21 ) {
            this.props.actions.updateQuantity(itemId, newValue)
            this._input[index].value = newValue
            this.setState({
                totalAmount: newTotalAmount,
                loading: false,
                disabled: ""
            })
        }
    }

    renderContent = () => {
        const {isBasketEmpty, allCarts, totalAmount} = this.props.ShoppingCartStore;
        const totalPrice = (this.state.totalAmount === 0) ?  totalAmount : parseFloat(this.state.totalAmount).toFixed(2);
        const self = this;
        self._input = []
        return (
            <div>
                {isBasketEmpty && <div> Your shopping cart is empty </div>}
                {
                    (!isBasketEmpty) && (
                        <div className="table-responsive">
                            <table className="table-condensed table-basket cf">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Item</th>
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
                                                <div className="input-group">
                                                  <span className="input-group-btn">
                                                    <button disabled={this.state.disabled} type="button" class="btn btn-default btn-number"  data-type="minus" onClick={()=>this.handleQuantity(-1, cart.item_id, cart.price, index)} data-field="quant[1]">
                                                      <span className="glyphicon glyphicon-minus"></span>
                                                    </button>
                                                  </span>
                                                  <input
                                                    type="number" 
                                                    className="form-control input-number"
                                                    readOnly 
                                                    defaultValue={cart.quantity}
                                                    ref={
                                                        function(el) {
                                                            self._input[index] = el;
                                                        }
                                                    }
                                                   />
                                                  <span className="input-group-btn">
                                                    <button disabled={this.state.disabled} type="button" className="btn btn-default btn-number" data-type="plus" onClick={()=>this.handleQuantity(1, cart.item_id, cart.price, index)} data-field="quant[1]">
                                                      <span className="glyphicon glyphicon-plus"></span>
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
                    )
                }
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
        return (
                  browserHistory.push('/checkout')
              )
    }

    renderSidebar = ()=>{
        const { isBasketEmpty } = this.props.ShoppingCartStore;
        return (
            <div>   
                <Link
                    to={`/`}
                >
                    <button className="btn btn-default left-btn">
                        <span className="glyphicon glyphicon-info-sign"/>
                        <span> Continue Shopping</span>
                    </button>
                </Link>
                {
                    (!isBasketEmpty) && (
                        <div>
                            <button className="btn btn-inverse middle-btn col-md-2 col-md-offset-5 col-md-6 col-xs-7"
                                    onClick={()=>this.cleanBasket()}        
                            >
                            <span className="glyphicon glyphicon-trash x-change"/>
                            Clean Cart
                            </button>
                            <button
                                className="btn btn-default hello-right right-btn col-md-2 col-md-6 col-xs-7"
                                onClick={()=>this.basketCheckout()}
                            >
                            <span className="glyphicon glyphicon-envelope x-change"/>
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
                    <div className="row">
                        <Navbar/>
                        <NotificationContainer/>
                    </div>
                    <div className="row bg-white">
                        <div className="col-md-12">
                            {this.renderContent()}
                        </div>
                        <div className="col-md-12 btn-user-checkout">
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