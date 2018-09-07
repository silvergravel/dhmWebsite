import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

//images
import LogoFull from '../images/logo-full.svg';
import LogoSmall from '../images/logo-small.svg';
import CartWithItems from '../images/cart-with-items.svg';
import Hamburger from '../images/hamburger.svg';

class Header extends Component {

  constructor(props) {
    super(props);

    //assign an initial boolean state depending on which url is first loaded in the browser.
    //we need this info in order to render the expanded or collapsed header.
    if(this.props.location.pathname == '/'){
      this.state = {expand: false};
    }else{
      this.state = {expand: true};
    }
    //console.log('first expand state:', this.state.expand);
  }

  componentWillMount() {
    // will trigger the callback function whenever a new Route renders a component(as long as this component stays mounted as routes change)
    this.props.history.listen(() => {
      var currentUrl = this.props.history.location.pathname;

      if(currentUrl == '/'){
        this.setState({expand: false});
      }else{
        this.setState({expand: true});
      }
    });
  }

  render() {
    let primLinks = ["primaryLinks"];
    let headerHeight = [""];
    //console.log('expand state:', this.state);
    if(this.state.expand) {
      headerHeight.push("expand");
      primLinks.push("expand");
    }

    return (
      <div className="header-small">
      <header className={headerHeight.join('')}>
        <nav>
          <div className="logo">
              <Link to="/">
                <img src={LogoFull} alt="dhmWheels"/>
              </Link>
          </div>
          <ul className="secondaryLinks">
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
            <li className="cart">
              <div className="cart-icon">
                <img src={CartWithItems} alt="cartIcon"/>
                <span className="items-in-cart">4</span>
              </div>
              <a href="#">Quote Cart</a>
            </li>
          </ul>
          <div className="logo-small"><img src={LogoSmall} alt="logo-small"/></div>
          <div className="mobile-header-icons">

            <div className="cart-icon cart-icon-mobile">
              <img src={CartWithItems} alt="cartIcon"/>
              <span className="items-in-cart">4</span>
            </div>
            <div className="hamburger"><img src={Hamburger} alt="hamburger"/></div>
          </div>
          <ul className={primLinks.join(' ')}>
          <li className="beige">
          Castors:
          </li>
          <li>
          Light Duty
          </li>
          <li>
          Medium Duty
          </li>
          <li>
          Heavy Duty
          </li>
          <li>
          Extra Heavy Duty
          </li>
          <li className="beige">
          |
          </li>
          <li>
          Trolleys
          </li>
          <li>
          Exclusive Products
          </li>
          <li>
          Spare Wheels
          </li>
          </ul>

        </nav>
      </header>
      </div>
    );
  }
}

export default withRouter(Header);
