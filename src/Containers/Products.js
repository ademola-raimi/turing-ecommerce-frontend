import React, { Component } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {Link} from 'react-router';
import _ from 'lodash';
import api from '../config/config.js';
import { fetchProducts, fetchAttributes } from '../actions/Products';
import { fetchCartId, totalPrice, totalCount } from '../actions/ShoppingCart';

class Products extends Component {
    constructor (props) {
        super(props);
        this.state = {
            ...props,
            modalOpen: false,
            searchTerm: null,
            selected: [],
            confirmDelete: false,
            products: []
        };
    }

    componentDidMount() {
        this.props.actions.fetchProducts();
        this.props.actions.totalPrice();
        this.props.actions.totalCount();
    }

    shouldComponentUpdate (nextProps, nextState, nextContent) {
        if (!_.isEqual(nextProps.ProductsStore.allProducts, this.props.ProductsStore.allProducts)) {
            if (nextProps.ProductsStore.allProducts.length > 0){
                this.setState({
                    products: nextProps.ProductsStore.allProducts,
                })
            }
        }

        return true;
    }

    renderProducts = (product,index)=>{
        return (
            <div className='col-sm-4 col-lg-4 col-md-4 book-list' key={index}>
                <div className="thumbnail">
                <Link to={`/product/${product.product_id}`}>
                    <img className='img-thumbnail'
                        src={api.cloudinary_path + product.thumbnail}
                        alt={product.name}
                    />
                 </Link>
                </div>
                <div className="caption">
                    <h4>
                        <Link to={`./product/${product.product_id}`}>
                            {product.name}
                        </Link>
                    </h4>
                    <p> {product.description}</p>
                    <h4 >
                        ${product.discounted_price == '0.00' ? product.price : product.discounted_price}
                    </h4>
                    <h4 ><strike>
                        {product.discounted_price != '0.00' ? '$'+product.price : ''}
                   </strike> </h4>
                </div>
            </div>
        );
    };

    loadMore = () => {
        
    }

    render(){
        return(
        <div>
            <div className="books row">
                {
                    this.state.products.map((product,index)=>{
                        return this.renderProducts(product,index);
                    })
                }
            </div>
            <div className="row">
                <div className="col-md-12">
                    <button className="pull-right btn btn-primary"
                            onClick={this.loadMore()}>
                        Load More
                    </button>
                </div>

            </div>
        </div>            

        )};
};

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
                fetchProducts,
                fetchAttributes,
                fetchCartId,
                totalPrice,
                totalCount
            },
            dispatch
        ),
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(Products);