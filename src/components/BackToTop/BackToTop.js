import React, { Component } from 'react';
import PropTypes from 'prop-types'

//material-ui
import { ArrowUpward } from '@material-ui/icons';
import { injectIntl } from 'react-intl';
import './BackToTop.scss';


class BackToTop extends Component {
    constructor (props) {
        super(props);
        this.state = {
            intervalId: 0,
            isShown: false
        }
    }

    componentDidMount = () => {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount = () => {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = (event) => {
        if (window.pageYOffset === 0 && this.state.isShown) {
            this.setState({
                isShown: false
            });
        } else if(window.pageYOffset !== 0 && !this.state.isShown) {
            this.setState({
                isShown: true
            });
        }
    }

    scrollStep = () => {
        if (window.pageYOffset === 0) {
            clearInterval(this.state.intervalId);
        }
        window.scroll(0, window.pageYOffset - this.props.scrollStepInPx)
    }

    scrollToTop = () => {
        let intervalId = setInterval(this.scrollStep.bind(this), this.props.delayInMs)
        this.setState({intervalId: intervalId})
    }

    renderMessage = () => {
        return (
            <div id="back-to-top" onClick={ () => { this.scrollToTop(); }}>
                <ArrowUpward/><div className="back-to-top-text">{this.props.intl.formatMessage({id: 'segments.scrolling.backToTop'})}</div>
            </div>
        );
    }

    render () {
        const { isShown } = this.state;
        return (
            <React.Fragment>
                { isShown && this.renderMessage() }
            </React.Fragment>
        )
    }
}

BackToTop.propTypes = {
    delayInMs: PropTypes.string.isRequired,
    scrollStepInPx: PropTypes.string.isRequired,
}

export default injectIntl(BackToTop);
