import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';

import moment from 'moment';
//existing bug on moment where moment.locale is prevented from being load
import 'moment/min/locales';
import PropTypes from 'prop-types';

import './DatePicker.scss';

import { default as Picker } from 'react-datepicker';
import Button from '@material-ui/core/Button';
import 'react-datepicker/dist/react-datepicker.css';

class DatePicker extends Component {
    constructor (props) {
        super(props);
        this.state = {...props};
    }

    shouldComponentUpdate (nextProps, nextState, nextContext) {
      if(nextProps.highlightedDates && nextProps.highlightedDates !== nextState.highlightedDates) {
        this.setState({highlightedDates : nextProps.highlightedDates})
      }
      return true;
    }

    render() {
        return (
            <div className='datepicker-container'>
                <Picker
                    selected={this.props.selectedDate.toDate()}
                    onSelect={(value) => this.props.onDateChange(value)}
                    singleDateRange={true}
                    selectionType={'single'}
                    highlightDates={[
                                      {
                                        "react-datepicker__day--highlighted-custom": this.state.highlightedDates
                                      }
                                   ]}
                    locale={this.props.intl.locale}
                    inline
                    fixedHeight
                />
                <Button size="small" className="datepicker-btn" onClick={() => this.props.onDateChange(moment.now())}>
                    <FormattedMessage id="datepicker.today" description="text"/>
                </Button>
            </div>
        );
    }
}

DatePicker.defaultProps = {
    selectedDate: moment()
};

DatePicker.propTypes = {
    onDateChange: PropTypes.func.isRequired
};
export default injectIntl(DatePicker);
