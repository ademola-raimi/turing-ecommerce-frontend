import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ModalContainer.scss';
//material-ui
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import { Close } from "@material-ui/icons";

class ModalContainer extends Component {
    renderModalHeader() {
        return (
            <React.Fragment>
                <DialogTitle disableTypography className="modal-header">
                    <Typography variant="h6" className="modal-title">
                        {this.props.modalHeader}
                    </Typography>
                    {
                        this.props.includeCloseBtn &&
                        <IconButton aria-label="Close" onClick={this.props.handleCancel}>
                          <Close />
                        </IconButton>
                    }
                </DialogTitle>
            </React.Fragment>
        )
    }

    renderModalFooter() {
        const {
            buttonLeft,
            buttonCentre,
            buttonRight,
            handleCancel,
            handleContinue,
            handleCentreBtnAction
        } = this.props;

        return (
            <DialogActions className="modal-footer">
                <Button onClick={handleCancel} variant="outlined" color="secondary">
                    {buttonLeft}
                </Button>
                { !_.isNil(buttonCentre) &&
                    <Button onClick={handleCentreBtnAction} color="secondary" variant="contained">
                    {buttonCentre}
                    </Button>
                }
                <Button onClick={handleContinue} color="secondary" variant="contained">
                    {buttonRight}
                </Button>
            </DialogActions>
        )
    }

    render() {
        const { includeModalHeader, includeModalFooter, fullScreen, fullWidth, maxWidth, className} = this.props;
        return (
            <Dialog
            onClose={this.props.handleCancel}
            aria-labelledby="customized-dialog-title"
            open={this.props.open}
            className={"default-modal " + className}
            fullScreen={fullScreen}
            fullWidth={fullWidth}
            maxWidth={maxWidth}
            PaperProps={{className: "modal-content-grid"}}
            >
            { includeModalHeader && this.renderModalHeader() }
            <div className="modal-content">
            { this.props.children }
            </div>
            { includeModalFooter && this.renderModalFooter() }
            </Dialog>
        );
      }
}

ModalContainer.propTypes = {
  includeModalHeader: PropTypes.bool.isRequired,
  includeModalFooter: PropTypes.bool.isRequired,
  handleCentreBtnAction: PropTypes.func,
  handleContinue: PropTypes.func,
  handleCancel: PropTypes.func,
  open: PropTypes.bool.isRequired,
};

ModalContainer.defaultProps = {
  includeModalHeader: true,
  includeModalFooter: true,
  open: false,
  fullScreen: false,
  fullWidth: false,
  maxWidth: "sm",
  className: '',
  includeCloseBtn: false
}


export default ModalContainer;
