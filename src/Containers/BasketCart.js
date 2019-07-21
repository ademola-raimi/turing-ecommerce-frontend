import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';

export const BasketCart = (props)=>{
    const {totalCartItem,totalAmount} = props.ShoppingCartStore;

    console.log('from props totalAmount', props.totalAmount)
    console.log('from props totalCartItem', props.totalCartItem)

    console.log('from ShoppingCartStore totalAmount', props.ShoppingCartStore.totalAmount)
    console.log('from ShoppingCartStore totalCartItem', props.ShoppingCartStore.totalCartItem)

    return(
        <div className="cart">
            <div className="dropdown">
                <Link 
                    to="/basket"
                    id="dLabel"
                    className="btn btn-inverse btn-block btn-large"
                >
                    <i className="fa fa-fa-shopping-cart" />
                    <span>{totalCartItem} item(s) - {totalAmount}</span>
                </Link>
            </div>
        </div>
    );
};

function mapStateToProps(state) {
    return {
        ShoppingCartStore: state.ShoppingCart,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(
            {
            },
            dispatch
        ),
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(BasketCart);