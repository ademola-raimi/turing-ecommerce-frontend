import React, { Component } from 'react';
import './InfiniteLoading.scss';
//material-ui
import { FormattedMessage } from 'react-intl';
import Typography from '@material-ui/core/Typography';

class InfiniteEndMessage extends Component {
  render() {
      return (
          <div id='infinite-loading-message'>
              <Typography variant="h4" gutterBottom className="text-center">
                  <FormattedMessage id="segments.video.end" description="text"/>
              </Typography>
          </div>
    );
  }
}

export default InfiniteEndMessage;
