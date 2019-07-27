
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
var data = require('../../data/configure-castor-content.json');
var productImgPath = require('../../data/product-img-path.json');


class Contact extends Component{

  constructor(props){
    super(props)

    typeof this.props.location.requestQuoteFlow !== 'undefined' ?
    this.createQuoteCartFields = true :
    this.createQuoteCartFields = false ;
  }

  render(props){
    console.log("should i create quote cart fields?");
    console.log(this.createQuoteCartFields);
    return(
      <div>
      <h4 className="black medium section__title">Contact</h4>
      <h3 className="black medium">Please provide us your contact details and we will
       be sure to get back to you very soon!</h3>
      <form name="contact" method="POST" data-netlify="true">
        <p>
        <label class="beige antique">FULL NAME<input type="text" name="name" /></label>
        </p>
        <p>
        <label class="beige antique">PHONE NUMBER<input type="tel" name="tel" /></label>
        </p>
        <p>
        <label class="beige antique">EMAIL ADDRESS<input type="email" name="email" /></label>
        </p>
        <p>
        
        </p>
        <p>
        <label class="beige antique">Message: <textarea name="message"></textarea></label>
        </p>
        <button type="submit">Send</button>
      </form>


      </div>

    );
  }

}
export default Contact;
