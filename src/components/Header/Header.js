import React, { Component } from 'react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import './Header.scss';
import { CompanyIcon } from '../../assets/sharedassets/icons/icons.js';

//material-ui'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Popover from '@material-ui/core/Popover';
import { AccountCircle, ArrowDropDown } from '@material-ui/icons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logoutUser, clearStore } from '../../actions/AuthActions';
import { isLoggedIn, checkIfAdmin, checkAdminAndManager } from '../../helpers/helper';
import _ from 'lodash';

class Header extends Component {
    constructor (props) {
        super(props);
        this.state = {
            open: false
        };

        this.accountDebounced = _.debounce(this.handleRequestClose, 5000);
    }

    componentWillUnmount () {
        this.accountDebounced.cancel();
    }

    handleOpenMenu = event => {
        this.accountDebounced.cancel();
        this.setState({open: true});
    };

    handleRequestClose = () => {
        this.accountDebounced.cancel();
        this.setState({open: false});
    };

    handleResetDecay = () => {
        this.accountDebounced.cancel();
    }


    handleMenuDecay = () => {
        this.accountDebounced();
    };

    handleLogout = () => {
        this.setState({open: false});
        //clear storage
        // clearAllCacheData();
        //clear store
        this.props.actions.logoutUser();
        this.props.actions.clearStore();
        //Redirect
        this.props.history.push('/login');
    };

    renderDropdownMenu () {
        const anchorEl = document.getElementById('account-button');
        return (
            <Popover
                id="user-menu-list"
                open={this.state.open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                onClose={this.handleRequestClose}
                onMouseEnter={this.handleResetDecay}
                onMouseOver={this.handleMenuDecay}
                disableRestoreFocus
            >
                <MenuList className="menu-list">
                    <MenuItem onClick={this.handleLogout}>
                        logout
                    </MenuItem>
                </MenuList>
            </Popover>
        );
    }

    renderTabs(){
        const roomLink = props => <NavLink className="app-bar-link" to='/rooms'
                                              activeClassName="selected" {...props} />;
        const roomTypeLink = props => <NavLink className="app-bar-link" to='/roomtypes'
                                               activeClassName="selected" {...props} />;
        const bookingsLink = props => <NavLink className="app-bar-link" to='/bookings'
                                                 activeClassName="selected" {...props} />;
        const hotelLink = props => <NavLink className="app-bar-link" to='/hotel'
                                                 activeClassName="selected" {...props} />;

        const priceListLink = props => <NavLink className="app-bar-link" to='/pricelists'
                                                 activeClassName="selected" {...props} />;

        const CalendarLink = props => <NavLink className="app-bar-link" to='/calendar'
                                                 activeClassName="selected" {...props} />;
        return(
            <>
                {checkIfAdmin() && (
                    <Button component={hotelLink} className="app-bar-button">
                        Hotel
                    </Button>
                )}
                {checkAdminAndManager() && (
                    <Button component={roomLink} className="app-bar-button">
                        Rooms
                    </Button> )}
                {checkAdminAndManager() && (
                    <Button component={roomTypeLink} className="app-bar-button">
                        Room Types
                    </Button>
                )}
                {checkAdminAndManager() && (
                    <Button component={priceListLink} className="app-bar-button">
                        Price Lists
                    </Button>
                )}
                <Button component={CalendarLink} className="app-bar-button">
                    Calendar
                </Button>
                <Button component={bookingsLink} className="app-bar-button">
                    Bookings
                </Button>
                <Button
                    className={'app-bar-button' + (isLoggedIn() ? ' app-bar-dropdown-button' : '')}
                    onClick={this.handleOpenMenu}
                    id="account-button"
                    aria-owns={this.state.open ? 'user-menu-list' : undefined}
                    aria-haspopup="true"
                    onMouseEnter={this.handleOpenMenu}
                    onMouseOut={this.handleMenuDecay}
                >
                    <AccountCircle className="avatar-icon"/>
                    Account
                    <ArrowDropDown/>
                </Button>
                { this.renderDropdownMenu() }
            </>
        )
    }

    render () {
        return (
            <AppBar className="app-bar" position="static">
                <Toolbar className="tool-bar">
                    <div className={ (isLoggedIn() ? "" : "logout-icon ") + "app-bar-logo"}>
                        <Link to="/">
                            Hotel
                        </Link>
                    </div>
                    { isLoggedIn() && this.renderTabs() }
                </Toolbar>
                { isLoggedIn() && <div id="segment-title"></div> }
            </AppBar>
        );
    }
}

function mapStateToProps(state) {
    return {
        UserStore: state.UserStore,
    };
}

function mapDispatchToProps (dispatch) {
    return {
        actions: bindActionCreators(
            {
                logoutUser,
                clearStore
            },
            dispatch
        ),
    };
}

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Header));
