import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

//images
import LogoFull from '../images/logo-full.svg';
import LogoSmall from '../images/logo-small.svg';
import CartWithItems from '../images/cart-with-items.svg';
import Mail from '../images/mail.svg';
import Phone from '../images/phone.svg';
import Hamburger from '../images/hamburger.svg';
import CloseHamburger from '../images/close-hamburger.svg';

//components
import HamburgerMenu from './headerComponents/hamburger-menu'

class Header extends Component {

  constructor(props) {
    super(props);



    this.state = {
      pathname: this.props.location.pathname,
      ishamburgerOpen: false
    }


    this.openHamburger = this.openHamburger.bind(this);
    this.closeHamburger = this.closeHamburger.bind(this);


  }


  openHamburger(){
    console.log("hamburger was clicked");
    this.setState({ishamburgerOpen: true});
    document.body.style.overflow = 'hidden';
  }

  closeHamburger(){

    this.setState({ishamburgerOpen: false});
    document.body.style.overflow = 'unset';
  }


  componentWillMount() {
    // will trigger the callback function whenever a new Route renders a component(as long as this component stays mounted as routes change)
    this.props.history.listen(() => {
      var currentUrl = this.props.history.location.pathname;
      this.setState({pathname: currentUrl})

    });
  }

  render() {
    // let primLinks = ["primaryLinks"];
    // let headerHeight = [""];
    //using the below two lines, as a quick roll back on the 'hide/show header that i had implemented earlier'
    let primLinks = ["primaryLinks expand"];
    let headerHeight = ["expand"];

    let matchId = this.state.pathname.replace('/','');

    // if(this.state.pathname !== '/') {
    //   headerHeight.push("expand");
    //   primLinks.push("expand");
    // }

    // console.log("the current pathname is: "+ matchId);



    let hamburgerElement;

    if(this.state.ishamburgerOpen){ //if hamburger is open then load up the close button
      hamburgerElement = <div className="hamburger close" onClick={this.closeHamburger}>
                            <img src={CloseHamburger} alt="close"/>
                         </div>
    } else{ //if hamburger is not open then load up the standard hamburger icon
      hamburgerElement = <div className="hamburger" onClick={this.openHamburger}>
                            <img src={Hamburger} alt="hamburger"/>
                         </div>

    }

    return (
      <div className="header-small">
      <header className={headerHeight.join('')}>
        <nav>
          <div className="logo">
              <Link to="/">
                <img src={LogoFull} alt="dhmWheels" onClick={this.closeHamburger}/>
              </Link>
          </div>
          <ul className="secondaryLinks">
            <li className='reg'>
              <a className='phone-icon-desktop' href="tel:00919821025854" target="_blank">
                <span><img src={Phone} alt="email"/></span>+91 98 2102 5854
              </a>
            </li>
            <li className='reg'>
              <a className='mail-icon-desktop' href="mailto:info@dhmwheels.com" target="_blank">
                <span><img src={Mail} alt="email"/></span>info@dhmwheels.com
              </a>
            </li>

            <li className="reg">
            <Link to="/contact">Contact Details</Link>
            </li>
            <Link to="/my-quote-cart">
              <li className={this.props.itemsInCart > 0 ? 'cart active' : 'cart inactive'}>
                <div className="cart-icon">
                  <img src={CartWithItems} alt="cartIcon"/>
                  <span className="items-in-cart">{this.props.itemsInCart}</span>
                </div>
                <span>Quote Cart</span>
              </li>
            </Link>
          </ul>
          <Link to="/">
            <div className="logo-small" onClick={this.closeHamburger}>
                <img src={LogoFull} alt="dhmwheels"/>
            </div>
          </Link>


            <div className="mobile-header-icons">
              <a className='phone-icon-mobile' href='tel:00919821025854' target="_blank" >
                <div><img src={Phone} alt="phone"/></div>
              </a>
              <a className='mail-icon-mobile' href='mailto:info@dhmwheels.com' target="_blank" >
                <div><img src={Mail} alt="email"/></div>
              </a>
              <Link to="/my-quote-cart">
                <div className="cart-icon cart-icon-mobile" onClick={this.closeHamburger}>
                  <img src={CartWithItems} alt="cartIcon"/>
                  <span className="items-in-cart">{this.props.itemsInCart}</span>
                </div>
              </Link>
              {hamburgerElement}
            </div>


          <HamburgerMenu
            ishamburgerOpen={this.state.ishamburgerOpen}
            matchId = {matchId}
            closeHamburger ={this.closeHamburger}
          />

          <ul className={primLinks.join(' ')}>
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

          </ul>

        </nav>
      </header>

      </div>
    );
  }
}

export default withRouter(Header);
