import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

class ScrollToTop extends Component {
  componentDidUpdate(prevProps) {
    if(this.props.location.pathname.includes("configure") === true && prevProps.location.pathname.includes("configure")){

    }else{
      if (this.props.location !== prevProps.location) {
        window.scrollTo(0, 0)
      }
    }

  }

  render() {
    return this.props.children
  }
}

export default withRouter(ScrollToTop)
