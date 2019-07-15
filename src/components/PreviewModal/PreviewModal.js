import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { ModalContainer } from '../../components';
//preview player
import ReactPlayer from 'react-player';

import './PreviewModal.scss';

class PreviewModal extends Component {
    render() {
        return (
            <ModalContainer
                className="preview-modal"
                handleCancel={this.props.handleCancel}
                open={this.props.openModal}
                includeModalFooter={false}
                fullWidth={true}
                includeModalHeader={false}
                maxWidth={'sm'}
            >
                <ReactPlayer
                    config={{
                        file: {
                            attributes: { disablepictureinpicture: 'true', type: "application/x-mpegURL" }
                        },
                    }}
                    width="100%"
                    height="100%"
                    pip={false}
                    muted={this.props.muted}
                    controls={true}
                    url={this.props.url}
                    playing={this.props.playing}
                />
            </ModalContainer>
        );
    }
}

PreviewModal.defaultProps = {
    openModal: false,
    playing: true,
    muted: true
};

PreviewModal.propTypes = {
    url: PropTypes.string.isRequired,
};

export default PreviewModal;
