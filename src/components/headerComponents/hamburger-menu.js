import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';


class HamburgerMenu extends Component{



  render(props){

    const ishamburgerOpen = this.props.ishamburgerOpen;

    let hamburgerMenuClass = ["hamburger-menu"];

    if(ishamburgerOpen) {
      hamburgerMenuClass.push("show");
    }

    let matchId = this.props.matchId;

    return(

      <div>

        <ul className={hamburgerMenuClass.join(' ')}>
        <div className="menu-block">
          <li className="beige">
          Castors:
          </li>
          <li className={matchId === "light-duty-castors" ? 'active' : ''}>
          <Link to="/light-duty-castors">Light Duty</Link>
          </li>
          <li className={matchId === "medium-duty-castors" ? 'active' : ''}>
          <Link to="/medium-duty-castors">Medium Duty</Link>
          </li>
          <li className={matchId === "heavy-duty-castors" ? 'active' : ''}>
          <Link to="/heavy-duty-castors">Heavy Duty</Link>
          </li>
          <li className={matchId === "extra-heavy-duty-castors" ? 'active' : ''}>
          <Link to="/extra-heavy-duty-castors">Extra Heavy Duty</Link>
          </li>
          <li>
          |
          </li>
          <li className={matchId === "trolleys" ? 'active' : ''}>
          <Link to="/trolleys">Trolleys</Link>
          </li>
          <li className={matchId === "exclusive-products" ? 'active' : ''}>
          <Link to="/exclusive-products">Exclusive Products</Link>
          </li>
          <li className={matchId === "spare-wheels" ? 'active' : ''}>
          <Link to="/spare-wheels">Spare Wheels</Link>
          </li>
          </div>
        </ul>

      </div>

    );
  }
}
export default HamburgerMenu;
