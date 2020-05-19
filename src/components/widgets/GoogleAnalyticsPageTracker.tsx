import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { GoogleService } from '../../services/google.service'

class GoogleAnalyticsPageTracker extends React.Component<RouteComponentProps> {
  componentDidUpdate(prevProps: RouteComponentProps) {
    if (this.props.location !== prevProps.location) {
      GoogleService.sendPageView()
    }
  }

  render() {
    return <></>
  }
}

export default withRouter(GoogleAnalyticsPageTracker)
