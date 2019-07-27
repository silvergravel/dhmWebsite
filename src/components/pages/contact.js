
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
    console.log(this.props.cartItems);

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
              {
                this.props.cartItems.map((item, index) => {
                  const selectedDuty = data[item.activeDutyId];
                  const selectedSeries = data[item.activeDutyId][item.activeSeriesId];
                  const selectedSeriesName = selectedSeries.series;
                  const materialOptions = selectedSeries.materialOptions;
                  const selectedMaterial = selectedSeries.materialOptions[item.activematerialOptionsId].material;
                  const selectedWheelDia = selectedSeries.materialOptions[item.activematerialOptionsId].vitalsOptions[item.activevitalsOptionsId].wheelDiameter;
                  const selectedLoadCap = selectedSeries.materialOptions[item.activematerialOptionsId].vitalsOptions[item.activevitalsOptionsId].loadCapacity;
                  const bracketOptions = selectedSeries.bracketOptions;
                  const selectedBracket = selectedSeries.bracketOptions[item.activebracketOptionsId].plateType;
                  const selectedBraking = selectedSeries.bracketOptions[item.activebracketOptionsId].brakingType;
                  //const selectedProductImageUrl = selectedSeries.materialOptions[item.activematerialOptionsId].image;
                  const selectedProductImageUrl = productImgPath[selectedDuty.code][selectedSeries.code][materialOptions[item.activematerialOptionsId].code][bracketOptions[item.activebracketOptionsId].code]["464"];

                  return(
                    <p className="hidden-field">
                      <label class="beige antique">MESSAGE, QUERIES, QUESTIONS (optional)
                        <textarea name="cart-items">
                          {selectedSeriesName
                            +"\n"
                            +selectedMaterial
                          }
                        </textarea>
                      </label>
                    </p>
                  )
                })
              }
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
