import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import { isLoggedIn } from '../helpers/helper';

export default function Navbar() {
    const cartsInfo = JSON.parse(localStorage.getItem('cartsInfo'));
    const customerName = localStorage.getItem('customerName')
    let cartCount = 0;
    if (cartsInfo && cartsInfo.length > 0) {
        cartCount = cartsInfo.length
    }
    return (
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="/">Home</a>
            </div>

            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav">
                <li className=""><a href="/basket">BasketCart <span className="badge">{cartCount}</span></a></li>
              </ul>
              <ul className="nav navbar-nav">
                <li className=""><a href="/orders">Orders</a></li>
              </ul>

              <ul className="nav navbar-nav navbar-right">
                {
                  !isLoggedIn() && (<li><a href="/register">Register</a></li>)
                }
                {
                  !isLoggedIn() && (<li><a href="/login">Login</a></li>)
                }
                {
                  isLoggedIn() && (<li onClick={()=>logout()} ><a href="#">Hello {customerName}</a></li>)
                }
                {
                  isLoggedIn() && (<li onClick={()=>logout()} ><a href="/login">Logout</a></li>)
                }
              </ul>
            </div>
          </div>
        </nav>

    );
}

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('customerId');

}
