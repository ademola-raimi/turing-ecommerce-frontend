import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link,withRouter} from 'react-router';
import {compose} from 'redux';
import classNames from 'classnames';
import { fetchDepartments } from '../actions/Departments';
import { fetchProductsDepartment } from '../actions/Products';
import { bindActionCreators } from 'redux';
import _ from 'lodash';


 class Departments extends Component {


    constructor (props) {
        super(props);
        this.state = {
            ...props,
            modalOpen: false,
            searchTerm: null,
            selected: [],
            confirmDelete: false,
            activeDepartmentId: null
        };
    }

    componentDidMount() {
        this.props.actions.fetchDepartments();
    }

    shouldComponentUpdate (nextProps, nextState, nextContent) {
        return true;
    }

    fetchProductDepartment = (departmentId) => {
        this.setState({
            activeDepartmentId: departmentId
        })
        this.props.actions.fetchProductsDepartment(true, departmentId);
    }

    renderDepartment = (department,index)=>{
        const linkClass = (this.state.activeDepartmentId == department.department_id) ? "list-group-item active" : "list-group-item"
        return(
            <Link
                to='#'
                className={linkClass}
                onClick={()=>this.fetchProductDepartment(department.department_id)}
            >
                {department.name}
            </Link>
        );
    };

    render() {
        const { allDepartments } = this.props.DepartmentStore;
        return (
            <div className="well">
                <h4>Departments</h4>
                <div className="list-group">
                    <Link
                        to='#'
                        className={_.isNil(this.state.activeDepartmentId) ? "list-group-item active" : "list-group-item"}
                        onClick={()=>this.fetchProductDepartment(null)}
                    >
                        All
                    </Link>
                    {
                        allDepartments.map((department,index)=>{
                        return this.renderDepartment(department,index);
                    })
                }
                </div>
            </div>
    )};
};

function mapStateToProps(state) {
    return {
        DepartmentStore: state.Departments,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(
            {
                fetchDepartments,
                fetchProductsDepartment
            },
            dispatch
        ),
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(Departments);