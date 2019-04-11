import React, { Component } from 'react';



class HamburgerMenu extends Component{



  render(props){

    const ishamburgerOpen = this.props.ishamburgerOpen;

    let hamburgerMenuClass = ["hamburger-menu"];

    if(ishamburgerOpen) {
      hamburgerMenuClass.push("show");
    }


    return(

      <div>
      
        <ul className={hamburgerMenuClass.join(' ')}>
          <a href="#">
            <li>
            link1
            </li>
          </a>
          <a href="#">
            <li>
            link2
            </li>
          </a>
          <a href="#">
            <li>
            link3
            </li>
          </a>
          <a href="#">
            <li>
            link4
            </li>
          </a>
        </ul>
      </div>

    );
  }
}
export default HamburgerMenu;
