import React, { Component } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {fetchPhoneById,addPhoneToBasket} from '../actions/Phones';
import {getPhonesById} from '../selectors/Phones';
import R from 'ramda';
import BasketCart  from './BasketCart';
import {Link} from 'react-router';
import { fetchProduct } from '../actions/Products';
import api from '../config/config.js';

class ProductDetails extends Component{

    componentDidMount = () => this.props.actions.fetchProduct(this.props.params.id);

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
        // console.log("columnFields ", columnFields);
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
                            src={api.cloudinary_path + product.thumbnail}
                            alt={product.name}
                        />

                    </div>
                    <div className="col-md-6">
                        {this.renderFields()}
                    </div>
                </div>
                <div className='caption-full'>
                    <h4 className='pull-right'>
                        ${product.price}
                    </h4>
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

    renderSideBar = ()=>{
        
        const {product, addPhoneToBasket} = this.props.ProductsStore;
        return(
            <div>
               <div>
                    <p className ='lead'> Quick Shop</p>
                    <BasketCart />
                    <div className='form-group'>
                        <h1>{product.name}</h1>
                        <h2>{product.price}</h2>
                    </div>
               </div>
               <Link to="/"
                    className="btn btn-info btn-block">
                    Back to Store
                </Link>
                <button type="button"
                        className="btn btn-success btn-block"
                        onClick={()=>addPhoneToBasket(product.product_id)}>
                    Add To Cart
                </button>
            </div>
        );
    };

    render(){
        // console.log(this.props.phone);
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
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(
            {
                fetchProduct,
            },
            dispatch
        ),
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(ProductDetails);