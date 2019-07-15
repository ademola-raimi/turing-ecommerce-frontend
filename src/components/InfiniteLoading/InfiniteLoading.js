import React, { Component } from 'react';
//material-ui
import CircularProgress from '@material-ui/core/CircularProgress';
import { FormattedMessage } from 'react-intl';
import Typography from '@material-ui/core/Typography';

import './InfiniteLoading.scss';

class InfiniteLoading extends Component {
    render () {
        return (
            <div id='infinite-loading-message'>
                <CircularProgress size={20} variant={'indeterminate'} color='secondary'/>
                <Typography variant="h4" gutterBottom className="text-center">
                    <FormattedMessage id="segments.video.loading" description="text"/>
                </Typography>
            </div>
        );
    }
}

export default InfiniteLoading;
