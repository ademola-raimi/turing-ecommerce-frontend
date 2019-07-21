import React, { Component } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { searchProducts } from '../actions/Products';

class Search extends Component{

    constructor(props){
        super(props);

        this.state = {
            searchValue:''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.onSearchInputChange = this.onSearchInputChange.bind(this);
    };


    handleSubmit = (e)=>{
        
        e.preventDefault();
        this.props.actions.searchProducts(true, this.state.searchValue);
    };

    onSearchInputChange = (e)=>{
        const searchValue = e.target.value;
        this.setState({
            searchValue
        });

    };

    render(){
        return(
            <div className="well blosd">
                <h3 className="lead"> 
                    Quick Shop 
                </h3>
                <div className="input-group">
                    <form onSubmit={this.handleSubmit}>
                        <input 
                            type="text"
                            className="form-control"
                            value={this.state.searchValue}    
                            onChange={this.onSearchInputChange}
                        />
                        <span className="input-group-btn search-gly">
                        <button className="btn btn-default">
                            <span className="glyphicon glyphicon-search" />
                        </button>
                    </span>
                    </form>
                </div>
            </div>
        );
    };
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
                searchProducts
            },
            dispatch
        ),
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(Search);