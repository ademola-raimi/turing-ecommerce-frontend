import React from 'react';
import { isLoggedIn } from '../helpers/helper';
import {Link} from 'react-router';
import { fetchProductsCategory } from '../actions/Products';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';

 function Navbar(props) {
    const cartCount = props.ShoppingCartStore.totalCartItem;
    const allCategories = props.CategoryStore.allCategories;
    const customerName = localStorage.getItem('customerName')
    return (
        <header className="bg-dark">
          <div className="top">
            <div className="topbar">
              <span className="hello">
                {
                  isLoggedIn() && (<li> <Link>Welcome {customerName}</Link> </li>)
                }
              </span>
              <span className="hello-right">
                <ul className="top-right">
                <li className=""><Link to={`/basket`}>Cart <span>({cartCount})</span> </Link> </li>
                <li className=""><Link to={`/orders`}>Orders</Link></li>
                  {
                    isLoggedIn() && (<li onClick={()=>logout()} ><a href={`/login`}>Logout</a></li>)
                  }
                  {
                    !isLoggedIn() && (<li><Link to={`/login`}>Login</Link></li>)
                  }
                  {
                    !isLoggedIn() && (<li><Link to={`/register`}>register</Link></li>)
                  }
                </ul>
              </span>
            </div>
          </div>
          <div className="container">
            <nav className="navbar navbar-defa.ult">
                <div className="navbar-header">
                  <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                  </button>
                  <Link className="navbar-brand" to={`/`}>Home</Link>
                </div>

                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul className="nav navbar-nav navbar-right">
                  <li onClick={()=>fetchProductCategory(props, null)} className="categoryNav"><Link to="#">All</Link></li>
                  {allCategories.map((category)=>{
                          return <li onClick={()=>fetchProductCategory(props, category.category_id)} className="categoryNav"><Link to="#">{category.name}</Link></li>
                        })}
                  </ul>
                </div>
            </nav>
          </div>
        </header>

    );
}

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('customerId');

}

const fetchProductCategory = (props, categoryId) => {
        props.actions.fetchProductsCategory(true, categoryId);
}

function mapStateToProps(state) {
    return {
        ShoppingCartStore: state.ShoppingCart,
        CategoryStore: state.Categories
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(
            {
              fetchProductsCategory
            },
            dispatch
        ),
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(Navbar);
