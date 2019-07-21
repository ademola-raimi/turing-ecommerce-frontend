import React, { Component } from "react";
import ReactSnackBar from "react-js-snackbar";
import { bindActionCreators } from 'redux';
import { closeNotification } from '../actions/NotificatonActions';

import {connect} from 'react-redux';

class NotificationSnackbar extends Component {
    state = {
      Show: false,
      Showing: false
    };

    show = () => {
      if (this.state.Showing) return;
      this.setState({ Show: true, Showing: true });
      setTimeout(() => {
        this.setState({ Show: false, Showing: false });
      }, 2000);
    };
    render() {
      return (
        <div>
          {this.show()}          
          <ReactSnackBar style={{color: 'red'}} Icon={<span>🦄</span>} Show={this.state.Show}>
           {this.props.message}
          </ReactSnackBar>
        </div>
      );
    }

}


function mapStateToProps(state) {
    return {
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(
            {
                closeNotification,
            },
            dispatch
        ),
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(NotificationSnackbar);