import React, { Component } from 'react';
import {connect} from 'react-redux';
// import {getCategories,getActiveCategoryId} from '../selectors/Phones';
import {Link,withRouter} from 'react-router';
import {compose} from 'redux';
import classNames from 'classnames';
import { fetchCategories } from '../actions/Categories';
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
            activeCategoryId: 1
        };
    }

    componentDidMount() {
        this.props.actions.fetchCategories();
    }

    shouldComponentUpdate (nextProps, nextState, nextContent) {

        
        return true;
    }

    renderCategory = (category,index)=>{
        const getActiveState = R.propEq('id',this.state.activeCategoryId);
        const linkClass = classNames({
            "list-group-item" : true,
            'active': getActiveState(category)
        });
        return(
            <Link
                to={`/categories/${category.id}`}
                className={linkClass}
                key={index}
            >
                {category.name}
            </Link>
        );
    };

    renderAllCategory = ()=>{
        const linkClass = classNames({
            "list-group-item" : true,
            active: R.isNil(this.state.activeCategoryId)
        });

        return (
            <Link
                to="/"
                className={linkClass}
            >
            All
            </Link>
        );
    };

    render() {
        const { allCategories, activeCategoryId } = this.props.CategoryStore;
        return (
            <div className="well">
                <h4>Brand</h4>
                <div className="list-group">
                    {this.renderAllCategory()}
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
                fetchCategories
            },
            dispatch
        ),
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(Categories);