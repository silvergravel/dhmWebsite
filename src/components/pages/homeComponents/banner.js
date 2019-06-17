import React, { Component } from 'react';
import { HashLink as Link } from "react-router-hash-link";

import Arrows from '../../../images/arrows.svg'

class Banner extends Component {
  render() {
    return (
      <div>
        <div className="banner">
          <div className="container">
          <h1 className="black regular banner__caption">
            Reputed stockists of castor wheels and trolleys for your
            domestic and industrial needs. Since 1952.
            <span>
              <Link smooth to="/heavy-duty-castors#mrn">
                Learn More
                <img src={Arrows} alt="arrows"/>
              </Link>
            </span>
          </h1>
          </div>

        </div>
      </div>
    );
  }
}

export default Banner;
