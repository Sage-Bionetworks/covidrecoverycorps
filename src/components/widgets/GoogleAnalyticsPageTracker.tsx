import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { UserService } from '../../services/user.service';

class GoogleAnalyticsPageTracker  extends React.Component<RouteComponentProps> {

  componentDidUpdate(prevProps: RouteComponentProps) {
    if (this.props.location !== prevProps.location) {
      UserService.sendPageViewToGoogleAnalytics()
    }
  }

  render(){
    return <></>
  }
}

export default withRouter(GoogleAnalyticsPageTracker)
