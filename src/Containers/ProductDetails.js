import React, { Component } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {fetchPhoneById,addPhoneToBasket} from '../actions/Phones';
import {getPhonesById} from '../selectors/Phones';
import R from 'ramda';
import _ from 'lodash';
// import BasketCart  from './BasketCart';
import {Link} from 'react-router';
import { fetchProduct, fetchAttributes } from '../actions/Products';
import { fetchCartId, saveCart, totalPrice, totalCount } from '../actions/ShoppingCart';
import api from '../config/config.js';
import { formatAttributes } from '../helpers/helper';

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
            totalCartItem: 0
        };
    }

    componentDidMount = () => {
        this.props.actions.fetchProduct(this.props.params.id);
        this.props.actions.fetchAttributes(this.props.params.id);
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
            console.log('cartId storage:',cartId)
            console.log('cartId normal:',nextProps.ShoppingCartStore.cartId)
            this.setState({
                cartId: !_.isNil(cartId) ? cartId : nextProps.ShoppingCartStore.cartId,
            })
        }

        if (!_.isEqual(nextProps.ShoppingCartStore.totalAmount, this.props.ShoppingCartStore.totalAmount)) {
            this.setState({
                totalAmount: nextProps.ShoppingCartStore.totalAmount,
            })
        }

        if (!_.isEqual(nextProps.ShoppingCartStore.totalCartItem, this.props.ShoppingCartStore.totalCartItem)) {
            this.setState({
                totalCartItem: nextProps.ShoppingCartStore.totalCartItem,
            })
        }

        return true;
    }

    renderFields = ()=>{
        const {product} = this.props.ProductsStore;
        const columnFields = R.compose(
            R.toPairs,
            R.pick([
                'cpu',
                'camera',
                'size',
                'weight',
                'display',
                'battery',
                'memory'
            ])
        )(product);
        return columnFields.map(([key,value])=>{
            return(
                <div className='column' key={key}>
                    <div className='ab-details-title'>
                        <p> { key } </p>
                    </div>
                    <div className='ab-details-info'>
                        <p> { value } </p>
                    </div>
                </div>
            );
           
        });
    };

    renderContent = ()=>{
        const {product} = this.props.ProductsStore;
        return(
            <div>
                <div className='thumbnail'>
                    <div className="col-md-6">
                        <img className='img-thumbnail'
                            src={api.cloudinary_path + product.image}
                            alt={product.name}
                        />

                    </div>
                    <div className="col-md-6">
                        {this.renderFields()}
                    </div>
                </div>
                <div className='caption-full'>
                    <h4>
                        {product.name}
                    </h4>
                    <p>
                        {product.description}
                    </p>
                </div>
            </div>
        );
    };

    handleColorChange = (event) => {
        this.setState({
            selectedColor: event.target.value
        })
    };

    handleSizeChange = (event) => {
        this.setState({
            selectedSize: event.target.value
        })
    }

    addProductToCart = (productId) => {
        const {cartId, selectedSize, selectedColor} = this.state;
        const attributes = selectedSize + " " + selectedColor;
        this.props.actions.saveCart(productId, cartId, attributes);
        this.props.actions.totalPrice();
        this.props.actions.totalCount();
    }

    renderSideBar = ()=>{
        
        const {product, addPhoneToBasket} = this.props.ProductsStore;

        return(
            <div>
               <div>
                    <p className='lead'> Quick Shop</p>
                    <div className="cart">
                        <div className="dropdown">
                            <Link
                                to="/basket"
                                id="dLabel"
                                className="btn btn-inverse btn-block btn-large"
                            >
                                <i className="fa fa-fa-shopping-cart" />
                                <span>{this.state.totalCartItem} item(s) - ${this.state.totalAmount}</span>
                            </Link>
                        </div>
                    </div>
                    <div className='form-group'>
                        <h1>{product.name}</h1>
                        <h2 >
                            ${product.discounted_price == '0.00' ? product.price : product.discounted_price}
                        </h2>
                        <h2>
                            <strike>
                                {product.discounted_price != '0.00' ? '$'+product.price : ''}
                            </strike>
                       </h2>

                       <select onChange={this.handleSizeChange}  className="form-inline">
                           <option value="">select size</option>
                           {this.state.sizes.map((size) => {
                                return <option name={size} value={size}>{size}</option>;
                           })}
                       </select>

                       <select onChange={this.handleColorChange} className="form-inline">
                           <option value="">select color</option>
                           {this.state.colors.map((color) => {
                                return <option name={color} value={color}>{color}</option>;
                           })}
                       </select>
                    </div>
               </div>
               <Link to="/"
                    className="btn btn-info btn-block">
                    Back to Store
                </Link>
                <button type="button"
                        className="btn btn-success btn-block"
                        onClick={()=>this.addProductToCart(product.product_id)}>
                    Add To Cart
                </button>
            </div>
        );
    };

    render(){
        const {product} = this.props.ProductsStore;
        return(
            <div className='view-container'>
                <div className='container'>
                    <div className='col-md-9'>
                        {product && this.renderContent()}
                    </div>
                    <div className='col-md-3'>
                        {product && this.renderSideBar()}
                    </div>
                </div>
            </div>
        );
    }
}

// export default Phone;
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