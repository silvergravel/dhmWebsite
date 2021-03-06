
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
        const quantity = it.quantity;

        var temp = "___________________________________________________" + "\n"
                  + "SERIES: "    + selectedSeriesName + "\n"
                  + "MATERIAL: "  + selectedMaterial   + "\n"
                  + "WHEEL DIA: " + selectedWheelDia   + " -----> (" + selectedLoadCap + ") \n"
                  + "BRACKET: "   + selectedBracket    + "\n"
                  + "BRAKING: "   + selectedBraking    + "\n"
                  + "GROOVE: "    + selectedGroove     + "\n"
                  + "**QUANTITY**: "  + quantity           + "\n"
                  + "___________________________________________________" + "\n"
                  + "___________________________________________________" + "\n";

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
      <div className='row'>
        <div className='col-md-6' style={{marginBottom: '64px'}}>
          <div className="form-header">
          { this.createQuoteCartFields === true
            ? <div>
                <Link to="/my-quote-cart" className="back-to-cart-btn">
                <img src={Arrows} alt="arrows"/><h4 className="orange regular">Go Back to Quote Cart</h4>
                </Link>
                <h4 className="black medium section__title contact-page">Quotation Request Form</h4>
                <h3 className="black medium">Please provide a few contact details below,
                so that we know how to get back to you.</h3>
              </div>
            : <div>
                <h4 className="black medium section__title contact-page">Contact form</h4>
                <h3 className="black medium">Have any questions or queries? Please get in touch with us by filling out some basic details below</h3>
              </div> }
          </div>
          <form name="contact" method="post">
              <input type="hidden" name="form-name" value="contact" />
              <p>
                <label class="beige antique">FULL NAME*<input type="text" name="name" required="required" placeholder=""/></label>
              </p>
              <p>
                <label class="beige antique">PHONE NUMBER*
                <input type="tel" name="tel"  required="required" placeholder=""/></label>
              </p>
              <p>
                <label class="beige antique">EMAIL ADDRESS*<input type="email" name="email" required="required" placeholder=""/></label>
              </p>
              <p>
                <label class="beige antique">MESSAGE, QUERIES, QUESTIONS (optional)
                <textarea name="message" placeholder="Write your queries or questions here..."></textarea></label>
              </p>
              {

                this.createQuoteCartFields === true ?
                <div>
                  <div className="hidden-field">
                    <label class="beige antique">
                      <textarea name="cart-items">
                        {itemsToForm}
                      </textarea>
                    </label>
                  </div>
                  <p>
                    <button class="primary" type="submit">
                      <h4 class="black antique">REQUEST QUOTE NOW</h4>
                    </button>
                  </p>
                </div> :
                <p>
                  <button class="primary" type="submit">
                    <h4 class="black antique">SEND MESSAGE</h4>
                  </button>
                </p>

              }



            </form>
          </div>
          { !this.createQuoteCartFields &&
            <div className='col-md-5 col-md-offset-1' >
              <h4 className="black medium section__title contact-page">CONTACT DETAILS</h4>
              <h3 className="black medium">Or you can visit our store, or reach us over email or phone</h3>
              <div style={{paddingTop: '24px'}}>
                <h4 className="beige antique">Address</h4>
                <p className='black medium'>DHM Wheels, 84 Bhajipala Street, Mumbai, 400003</p>
              </div>

              <div style={{paddingTop: '24px'}}>
                <h4 className="beige antique">EMAIL</h4>
                <a href='mailto:info@dhmwheels.com' target='_blank'>info@dhmwheels.com</a>
              </div>

              <div style={{paddingTop: '24px'}}>
                <h4 className="beige antique">PHONE</h4>
                <a href='tel:00919821025854' target='_blank'>+91 98 2102 5854</a><br/>
                <a href='tel:00919820207057' target='_blank'>+91 98 2020 7057</a>
              </div>
            </div> }
        </div>
        </div>

      </div>

    );
  }

}
export default Contact;
