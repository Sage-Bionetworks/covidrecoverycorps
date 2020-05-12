import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { GoogleService } from '../../services/google.service';

class ScrollToTopOnRouteChange  extends React.Component<RouteComponentProps> {

  componentDidUpdate(prevProps: RouteComponentProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0,0)
    }
  }

  render(){
    return <></>
  }
}

export default withRouter(ScrollToTopOnRouteChange)
