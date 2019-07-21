import React, { Component } from 'react';
import {connect} from 'react-redux';
// import {getCategories,getActiveCategoryId} from '../selectors/Phones';
import {Link,withRouter} from 'react-router';
import {compose} from 'redux';
import classNames from 'classnames';
import { fetchCategories } from '../actions/Categories';
import { fetchProductsCategory } from '../actions/Products';
import R from 'ramda';
import { bindActionCreators } from 'redux';
import _ from 'lodash';


 class Categories extends Component {


    constructor (props) {
        super(props);
        this.state = {
            ...props,
            modalOpen: false,
            searchTerm: null,
            selected: [],
            confirmDelete: false,
            activeCategoryId: null
        };
    }

    componentDidMount() {
        this.props.actions.fetchCategories();
    }

    shouldComponentUpdate (nextProps, nextState, nextContent) {
        return true;
    }

    fetchProductCategory = (categoryId) => {
        console.log(categoryId)
        this.setState({
            activeCategoryId: categoryId
        })
        this.props.actions.fetchProductsCategory(categoryId);
    }

    renderCategory = (category,index)=>{
        const linkClass = (this.state.activeCategoryId == category.category_id) ? "list-group-item active" : "list-group-item"
        // const getActiveState = R.propEq('id',this.state.activeCategoryId);
        // const linkClass = classNames({
        //     "list-group-item" : true,
        //     'active': getActiveState(category)
        // });
        return(
            <a
                href='#'
                className={linkClass}
                onClick={()=>this.fetchProductCategory(category.category_id)}
            >
                {category.name}
            </a>
        );
    };

    render() {
        const { allCategories } = this.props.CategoryStore;
        return (
            <div className="well">
                <h4>Categories</h4>
                <div className="list-group">
                    <a
                        href='#'
                        className={_.isNil(this.state.activeCategoryId) ? "list-group-item active" : "list-group-item"}
                        onClick={()=>this.fetchProductCategory(null)}
                    >
                        All
                    </a>
                    {
                        allCategories.map((category,index)=>{

                        return this.renderCategory(category,index);
                    })
                }
                </div>
            </div>
    )};
};

function mapStateToProps(state) {
    return {
        CategoryStore: state.Categories,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(
            {
                fetchCategories,
                fetchProductsCategory
            },
            dispatch
        ),
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(Categories);