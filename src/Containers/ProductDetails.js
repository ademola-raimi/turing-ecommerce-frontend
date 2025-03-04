import React, { Component } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import BasketCart  from './BasketCart';
import Loader from 'react-loader-spinner';
import {Link} from 'react-router';
import { fetchProduct, fetchAttributes } from '../actions/Products';
import { fetchCartId, saveCart, totalPrice, totalCount } from '../actions/ShoppingCart';
import api from '../config/config.js';
import { formatAttributes } from '../helpers/helper';
import Navbar from './Navbar';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';

class ProductDetails extends Component {
    constructor (props) {
        super(props);
        this.state = {
            ...props,
            modalOpen: false,
            cartId: null,
            colors: [],
            sizes: [],
            selectedColor: '',
            selectedSize: '',
            totalAmount: 0,
            totalCartItem: 0,
            errors: {},
            loading: false,
            disabled: ""
        };
    }

    componentDidMount = () => {
        this.props.actions.fetchAttributes(this.props.params.id);
        this.props.actions.fetchProduct(this.props.params.id);
        this.props.actions.fetchCartId();
        this.props.actions.totalPrice();
        this.props.actions.totalCount();
    }

    shouldComponentUpdate (nextProps, nextState, nextContent) {
        if (!_.isEqual(nextProps.ProductsStore.atrributes, this.props.ProductsStore.atrributes)) {
            if (nextProps.ProductsStore.atrributes.length > 0){
                this.setState({
                    colors: formatAttributes(nextProps.ProductsStore.atrributes)['colors'],
                    sizes: formatAttributes(nextProps.ProductsStore.atrributes)['sizes']
                })
            }
        }

        if (!_.isEqual(nextProps.ShoppingCartStore.cartId, this.props.ShoppingCartStore.cartId)) {
            //if user navigated to the same page, for example,
            //clicking same tab
            let cartId = localStorage.getItem('cartId');
            this.setState({
                cartId: !_.isNil(cartId) ? cartId : nextProps.ShoppingCartStore.cartId,
            })
        }

        if (!_.isEqual(nextProps.ShoppingCartStore.totalAmount, this.props.ShoppingCartStore.totalAmount)) {
            this.setState({
                totalAmount: nextProps.ShoppingCartStore.totalAmount,
                loading: false,
                disabled: ""
            })
        }

        if (!_.isEqual(nextProps.ShoppingCartStore.totalCartItem, this.props.ShoppingCartStore.totalCartItem)) {
            this.props.actions.totalPrice();
            NotificationManager.success('Successfully added to cart', 'shopping cart');
            this.setState({
                totalCartItem: nextProps.ShoppingCartStore.totalCartItem,
                loading: false,
                disabled: ""
            })
        }

        if (!_.isEqual(nextProps.ShoppingCartStore.hasError, this.props.ShoppingCartStore.hasError)) {
            NotificationManager.error('Something went wrong', 'shopping cart');
        }

        return true;
    }

    renderContent = ()=>{
        const {product} = this.props.ProductsStore;
        return(
            <div>
                <div className='move-left'>
                    <div className="col-md-4">
                        <img
                            src={api.cloudinary_path + product.image}
                            alt={product.name}
                        />
                    </div>
                    <div className="col-md-8">
                        <div className='caption-full'>
                            <h4>
                                {product.name}
                            </h4>
                            <p>
                                {product.description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    handleColorChange = (event) => {
        this.setState({
            selectedColor: event.target.value
        })
    };

    handleSizeChange = (size) => {
        this.setState({
            selectedSize: size
        })
    }

    handleValidation = () => {
        let { selectedSize } = this.state;
        let errors = {};
        let formIsValid = true;
        if (!selectedSize || selectedSize === "Select size") {
            formIsValid = false;
            errors["size"] = 'Size is required.';
        }
         if (!selectedSize || selectedSize === "Select color") {
            formIsValid = false;
            errors["color"] = 'Color is required.';
        }
        if (this.state.sizes.length === 0 ) {
            errors = {};
            formIsValid = true;
        }
        if (this.state.colors.length === 0 ) {
            errors = {};
            formIsValid = true;
        }
        this.setState({errors: errors});
        return formIsValid;
    }

    addProductToCart = (productId) => {
        if (this.handleValidation()) {
            this.setState({ loading: true, disabled: "disabled" });
            const {cartId, selectedSize, selectedColor} = this.state;
            let attributes = selectedSize + " " + selectedColor;
            if (attributes === " ") {
                attributes = "Not specify";
            }

            this.props.actions.saveCart(productId, cartId, attributes);
        }
    }

    renderSizeAttributes = (size)=>{
        const linkClass = (this.state.selectedSize === size) ? "badge badge-red active" : "badge"
        return(
            <Link
                className={linkClass}
                onClick={()=>this.handleSizeChange(size)}
            >
                {size}
            </Link>
        );
    };

    renderSideBar = ()=>{
        const {product} = this.props.ProductsStore;
        return(
            <div>
               <div>
                   <div className="cart">
                        <div className="dropdown">
                            <BasketCart/>
                        </div>
                    </div>
                    <div className='form-group product-sidebar'>
                        <h1>{product.name}</h1>
                        <h2 >
                            ${product.discounted_price === '0.00' ? product.price : product.discounted_price}
                        </h2>
                        <h2>
                            <strike>
                                {product.discounted_price !== '0.00' ? '$'+product.price : ''}
                            </strike>
                        </h2>

                        <div className='list-group'>
                            {
                                this.state.sizes.map((size) => {
                                    return this.renderSizeAttributes(size);
                               })
                            }
                        </div>

                       <span className="form-error"><strong>{this.state.errors["size"]}</strong></span>
                       <div className='form-group'>
                       <select onChange={this.handleColorChange} className="form-inline">
                           <option value="">Select color</option>
                           {this.state.colors.map((color) => {
                                return <option name={color} value={color}>{color}</option>;
                           })}
                       </select>
                       </div>
                       <span className="form-error"><strong>{this.state.errors["color"]}</strong></span>
                    </div>
               </div>
               <Link to="/"
                    className="btn btn-default btn-block">
                    Back to Store
                </Link>
                <button disabled={this.state.disabled} type="button"
                        className="btn btn-inverse product btn-block"
                        onClick={()=>this.addProductToCart(product.product_id)}> { this.state.loading && <img width = '15%' src={window.location.origin + '/Spinner.gif'} alt='addimagetocart' /> }
                     Add To Cart
                </button>
            </div>
        );
    };

    render(){
        const {product, isLoading} = this.props.ProductsStore;
        return(
            <div className='view-container'>
                <div className='container'>
                    <div className='row'>
                        <Navbar/>
                        <NotificationContainer/>
                    </div>
                    <div className='row'>
                        <div className='col-md-9'>
                            {
                                isLoading ? <Loader type="ThreeDots" color="#2BAD60" height="100" width="100" /> :
                                product && this.renderContent()

                            }
                        </div>
                        <div className='col-md-3'>
                            {product && this.renderSideBar()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        ProductsStore: state.Product,
        ShoppingCartStore: state.ShoppingCart,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(
            {
                fetchProduct,
                fetchAttributes,
                fetchCartId,
                saveCart,
                totalPrice,
                totalCount
            },
            dispatch
        ),
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(ProductDetails);