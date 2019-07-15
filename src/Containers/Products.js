import React, { Component } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchProducts } from '../actions/Products';
import {Link} from 'react-router';
import _ from 'lodash';
import R from 'ramda';
import {loadMore,addproductToBasket} from '../actions/Phones';
import api from '../config/config.js';
import Navbar from './Navbar';


class Products extends Component {

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
        this.props.actions.fetchProducts();
    }

    renderProducts = (product,index)=>{
        const {addProductToBasket} = this.props;
        const shortDesc = `${R.take(60,product.description)}...`;
        return (
            <div className='col-sm-4 col-lg-4 col-md-4 book-list' key={index}>
                <div className="thumbnail">
                    <img className='img-thumbnail'
                        src={api.cloudinary_path + product.thumbnail}
                        alt={product.name}
                    />
                </div>
                <div className="caption">
                    <h4 className="pull-right">
                        ${product.price}
                    </h4>
                    <h4>
                        <Link to={`./product/${product.product_id}`}>
                            {product.name}
                        </Link>
                    </h4>
                    <p> {shortDesc}</p>
                    <p className='itemButton'>
                        <button className="btn btn-primary"
                                onClick={()=>addProductToBasket(product.product_id)}>
                            Buy Now
                        </button>
                        <Link to={`/product/${product.product_id}`}
                            className="btn btn-default">
                            More Info
                        </Link>
                    </p>
                </div>
            </div>
        );
    };

    render(){
        const {allProducts} = this.props.ProductsStore;
        return(
        <div>
            
            <div className="books row">
                {
                    allProducts.map((product,index)=>{
                        return this.renderProducts(product,index);
                    })
                }
            </div>
            <div className="row">
                <div className="col-md-12">
                    <button className="pull-right btn btn-primary"
                            onClick={loadMore}>
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
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(
            {
                fetchProducts,
            },
            dispatch
        ),
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(Products);