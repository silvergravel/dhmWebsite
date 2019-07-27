import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';


class HamburgerMenu extends Component{

  constructor(props){
    super(props)


  }


  render(props){

    const ishamburgerOpen = this.props.ishamburgerOpen;

    let hamburgerMenuClass = ["hamburger-menu"];

    if(ishamburgerOpen) {
      hamburgerMenuClass.push("show");
    }

    let matchId = this.props.matchId;

    return(

      <div>

        <ul className={hamburgerMenuClass.join(' ')+" hamburger-primaryLinks"}>
        <div className="menu-block">
          <li className="beige">
          Castors:
          </li>
          <li className={matchId === "light-duty-castors" ? 'active' : ''} onClick={this.props.closeHamburger}>
          <Link to="/light-duty-castors">Light Duty</Link>
          </li>
          <li className={matchId === "medium-duty-castors" ? 'active' : ''} onClick={this.props.closeHamburger}>
          <Link to="/medium-duty-castors">Medium Duty</Link>
          </li>
          <li className={matchId === "heavy-duty-castors" ? 'active' : ''} onClick={this.props.closeHamburger}>
          <Link to="/heavy-duty-castors">Heavy Duty</Link>
          </li>
          <li className={matchId === "extra-heavy-duty-castors" ? 'active' : ''} onClick={this.props.closeHamburger}>
          <Link to="/extra-heavy-duty-castors">Extra Heavy Duty</Link>
          </li>
          <div class="custom-gap-20"></div>
          <li className="beige">
          Other Products:
          </li>
          <li className={matchId === "trolleys" ? 'active' : ''} onClick={this.props.closeHamburger}>
          <Link to="/trolleys">Trolleys</Link>
          </li>
          <li className={matchId === "exclusive-products" ? 'active' : ''} onClick={this.props.closeHamburger}>
          <Link to="/exclusive-products">Exclusive Products</Link>
          </li>
          <li className={matchId === "spare-wheels" ? 'active' : ''} onClick={this.props.closeHamburger}>
          <Link to="/spare-wheels">Spare Wheels</Link>
          </li>
          </div>
        </ul>

      </div>

    );
  }
}
export default HamburgerMenu;
