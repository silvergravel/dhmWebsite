
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Arrows from '../../images/arrows-left.svg'

var data = require('../../data/configure-castor-content.json');
var productImgPath = require('../../data/product-img-path.json');


class Contact extends Component{

  constructor(props){
    super(props)

    if(typeof this.props.location.requestQuoteFlow !== 'undefined'){
        this.createQuoteCartFields = true;

    }else{
        this.createQuoteCartFields = false ;
    }


  }

  render(props){

    console.log("should i create quote cart fields?");
    var castorDutyIds = ['ld','md','hd'];
    var items = this.props.cartItems;
    var itemStrings =[];


    for(var i = 0 ; i < items.length; i++){

      //if it is a castor, then fetch all the 'castor pattern' related details
      if(castorDutyIds.includes(items[i].activeDutyId)){
        var it = items[i];
        const selectedSeries = data[it.activeDutyId][it.activeSeriesId];
        const selectedSeriesName = selectedSeries.series;
        const materialOptions = selectedSeries.materialOptions;
        const selectedMaterial = selectedSeries.materialOptions[it.activematerialOptionsId].material;
        const selectedWheelDia = selectedSeries.materialOptions[it.activematerialOptionsId].vitalsOptions[it.activevitalsOptionsId].wheelDiameter;
        const selectedLoadCap = selectedSeries.materialOptions[it.activematerialOptionsId].vitalsOptions[it.activevitalsOptionsId].loadCapacity;
        const bracketOptions = selectedSeries.bracketOptions;
        const selectedBracket = selectedSeries.bracketOptions[it.activebracketOptionsId].plateType;
        const selectedBraking = selectedSeries.bracketOptions[it.activebracketOptionsId].brakingType;
        const selectedGroove = it.activegrooveOptionsId !== null ? selectedSeries.grooveOptions[it.activebracketOptionsId].plateType : "";

        var temp =  "SERIES: "    + selectedSeriesName + " \n "
                  + "MATERIAL: "  + selectedMaterial   + " \n "
                  + "WHEEL DIA: " + selectedWheelDia   + " -----> (" + selectedLoadCap + ") \n "
                  + "BRACKET: "   + selectedBracket    + " \n "
                  + "BRAKING: "   + selectedBraking    + " \n "
                  + "GROOVE: "    + selectedGroove     + " \n "
                  + "___________________________________________________" + " \n "
                  + "---------------------------------------------------" + " \n ";
        itemStrings.push(temp);
      }else{
        //else it would be a non-castor, so fetch all 'non-castor pattern' related details.
      }


    }
    var itemsToForm = itemStrings.join("");
    console.log("itemStrings");
    console.log(itemsToForm);

    return(
      <div>
      <div className="container contact-page-container">
      <div className="form-header">
      {
        this.createQuoteCartFields === true &&
        <Link to="/my-quote-cart" className="back-to-cart-btn">
        <img src={Arrows} alt="arrows"/><h4 className="orange regular">Go Back to Cart</h4>
        </Link>
      }

        <h4 className="black medium section__title contact-page">Contact</h4>
        <h3 className="black medium">Please provide a few contact details below,
        so that we know how to get back to you.</h3>
      </div>
      <form name="contact" method="post">
          <input type="hidden" name="form-name" value="contact" />
          <p>
            <label class="beige antique">FULL NAME*<input type="text" name="name" required="required" placeholder="Ramesh Bharat"/></label>
          </p>
          <p>
            <label class="beige antique">PHONE NUMBER*
            <input type="tel" name="tel"  required="required" placeholder="99999 99999"/></label>
          </p>
          <p>
            <label class="beige antique">EMAIL ADDRESS*<input type="email" name="email" required="required" placeholder="ramesh@mail.com"/></label>
          </p>
          <p>
            <label class="beige antique">MESSAGE, QUERIES, QUESTIONS (optional)
            <textarea name="message" placeholder="Write your queries or questions here..."></textarea></label>
          </p>
          {

            this.createQuoteCartFields === true &&
              <div>
              <p className="hidden-field">
              <label class="beige antique">MESSAGE, QUERIES, QUESTIONS (optional)
                <textarea name="cart-items">
              {itemsToForm}
              </textarea>
            </label>
              </p>
              </div>


          }

          <p>
            <button type="submit">Send</button>
          </p>
        </form>
        </div>

      </div>

    );
  }

}
export default Contact;
