
import React, { Component,  Fragment } from 'react';
import { Link } from 'react-router-dom';

var data = require('../../data/configure-castor-content.json');
var productImgPath = require('../../data/product-img-path.json');

class Cart extends Component{

  constructor(props){
    super(props);
  }

  render(){



    return(

      <div>
        <div className="container cartItemsListWrapper">
            <h4 className="black medium section__title section__title--quoteCart">Quote Cart</h4>
        {this.props.cartItems.map((item, index) => {

          if(item.configurable === true){
            const selectedDuty = data[item.activeDutyId];
            const selectedSeries = data[item.activeDutyId][item.activeSeriesId];
            const selectedSeriesName = selectedSeries.series;
            const materialOptions = selectedSeries.materialOptions;
            const selectedMaterial = selectedSeries.materialOptions[item.activematerialOptionsId].material;
            const selectedWheelDia = selectedSeries.materialOptions[item.activematerialOptionsId].vitalsOptions[item.activevitalsOptionsId].wheelDiameter;
            const selectedLoadCap = selectedSeries.materialOptions[item.activematerialOptionsId].vitalsOptions[item.activevitalsOptionsId].loadCapacity;
            var bracketOptions;
            var selectedBracket;
            var selectedBraking;
            var imageSet;
            var selectedProductImageUrl;

            if("bracketOptions" in selectedSeries){
              bracketOptions = selectedSeries.bracketOptions;
              selectedBracket = selectedSeries.bracketOptions[item.activebracketOptionsId].plateType;
              selectedBraking = selectedSeries.bracketOptions[item.activebracketOptionsId].brakingType;
              imageSet = productImgPath[selectedDuty.code][selectedSeries.code][materialOptions[item.activematerialOptionsId].code][bracketOptions[item.activebracketOptionsId].code]["464"];

              Array.isArray(imageSet) ?
                selectedProductImageUrl = imageSet[0] :
                selectedProductImageUrl = imageSet;

            }else{
              imageSet = productImgPath[selectedDuty.code][selectedSeries.code][materialOptions[item.activematerialOptionsId].code]["464"];
              Array.isArray(imageSet) ?
                selectedProductImageUrl = imageSet[0] :
                selectedProductImageUrl = imageSet;
            }

            var grooveOptions;
            var selectedGroove;
            if("grooveOptions" in selectedSeries){
                grooveOptions = selectedSeries.grooveOptions;
                selectedGroove = selectedSeries.grooveOptions[item.activegrooveOptionsId].plateType;
                imageSet = productImgPath[selectedDuty.code][selectedSeries.code][materialOptions[item.activematerialOptionsId].code][bracketOptions[item.activebracketOptionsId].code][grooveOptions[item.activegrooveOptionsId].code]["464"];
                Array.isArray(imageSet) ?
                  selectedProductImageUrl = imageSet[0] :
                  selectedProductImageUrl = imageSet;
            }

            console.log(selectedProductImageUrl);

          return(
            <div key={index} className="cartItemBlock">
              <div className="cartItemBlock__header">
                <h4 className="black medium seriesName">{selectedSeriesName}</h4>
              </div>
              <div className="cartItemBlock__body">
                <div className="itemImgWrapper body__element">
                  <img src={process.env.PUBLIC_URL + selectedProductImageUrl} alt="" />
                </div>
                <div className="itemConfigAndActionsWrapper body__element">
                  <div className="itemConfig">
                    <div className="materialConfig config">
                      <h4 className="beige antique">MATERIAL</h4>
                      <h4 className="black medium">{selectedMaterial}</h4>
                    </div>
                    <div className="wheelDiaConfig config">
                    <h4 className="beige antique">WHEEL DIAMETER</h4>
                    <h4 className="black medium">{selectedWheelDia}</h4>
                    </div>
                    <div className="LoadCapConfig config">
                    <h4 className="beige antique">LOAD CAPACITY</h4>
                    <h4 className="black medium">Upto {selectedLoadCap}</h4>
                    </div>
                    {
                      "bracketOptions" in selectedSeries === true &&
                        <div className="BracketConfig config">
                        <h4 className="beige antique">BRACKET TYPE</h4>
                        <h4 className="black medium">{selectedBracket}</h4>
                        {selectedBraking !== null && <h4 className="black medium"><span className="regular">with </span>{selectedBraking}</h4>}
                        </div>
                    }
                    {
                      "grooveOptions" in selectedSeries === true &&
                        <div className="config">
                        <h4 className="beige antique">GROOVE TYPE</h4>
                        <h4 className="black medium">{selectedGroove}</h4>
                        </div>
                    }

                  </div>
                  <div className="itemActions">
                    <button className="tertiary">
                      <h4 className="black regular">edit</h4>
                    </button>
                    <div className="divider"></div>
                    <button className="tertiary" data-id={index} onClick={(e) => this.props.deleteCartItem(e.currentTarget.dataset.id)}>
                      <h4 className="orange regular">remove</h4>
                    </button>
                  </div>
                </div>
                <div className="itemQtyWrapper body__element">
                  <h4 className="beige antique">QUANTITY</h4>
                  <h2 className="black light">{item.quantity}</h2>
                </div>
              </div>
            </div>
          )
        }else if(item.configurable === false){

          const selectedDuty = data[item.activeDutyId];
          const selectedDutyName = selectedDuty.duty;
          const selectedSeries = data[item.activeDutyId][item.activeSeriesId];
          const selectedSeriesName = selectedSeries.series;
          const productImageSet = productImgPath[selectedDuty.code][selectedSeries.code]["464"];
          var selectedProductImageUrl;
          Array.isArray(productImageSet) ?
            selectedProductImageUrl = productImageSet[0] :
            selectedProductImageUrl = productImageSet;
          var selectedLoadCap;
          var selectedDimensions;
          if(selectedDutyName === "trolleys"){
            selectedLoadCap = selectedSeries.vitalsOptions[0].vitals[0].value;
            selectedDimensions = selectedSeries.vitalsOptions[0].vitals[1].value;
          }


          return(
            <div key={index} className="cartItemBlock">
              <div className="cartItemBlock__header">
                <h4 className="black medium seriesName">{selectedSeriesName}</h4>
              </div>
              <div className="cartItemBlock__body">
                <div className="itemImgWrapper body__element">
                  <img src={process.env.PUBLIC_URL + selectedProductImageUrl} alt="" />
                </div>
                <div className="itemConfigAndActionsWrapper body__element">
                  <div className="itemConfig">
                    {
                      selectedDutyName === "trolleys" &&


                            <div className="LoadCapConfig trolleysConfig">
                            <h4 className="beige antique">LOAD CAPACITY</h4>
                            <h4 className="black medium">{selectedLoadCap}</h4>
                            </div>


                    }
                    {
                      selectedDutyName === "trolleys" &&



                            <div className="DimensionsConfig trolleysConfig">
                            <h4 className="beige antique">DIMENSIONS</h4>
                            <h4 className="black medium">{selectedDimensions}</h4>
                            </div>

                    }
                  </div>
                  <div className="itemActions">
                    <button className="tertiary">
                      <h4 className="black regular">edit</h4>
                    </button>
                    <div className="divider"></div>
                    <button className="tertiary" data-id={index} onClick={(e) => this.props.deleteCartItem(e.currentTarget.dataset.id)}>
                      <h4 className="orange regular">remove</h4>
                    </button>
                  </div>
                </div>
                <div className="itemQtyWrapper body__element">
                  <h4 className="beige antique">QUANTITY</h4>
                  <h2 className="black light">{item.quantity}</h2>
                </div>
              </div>
            </div>
          )
        }

        })}
      { this.props.cartItems.length > 0
        ? <Fragment>
            <Link to={{
              pathname: "/contact",
              requestQuoteFlow: true
            }}>
            <button className="primary confirmCartBtn"><h4 className="black antique">CONFIRM AND PROCEED TO REQUEST QUOTE</h4></button>
            </Link>
            <div style={{display: 'flex', justifyContent: 'center', paddingTop: '24px'}}>
              <h5 className="black regular" style={{maxWidth: '500px', textAlign: 'center', fontStyle: 'italic', lineHeight: '1.4em' }}>By proceeding, you will NOT be taken to a payment page where you can buy the products online. this will simply take you to a contact form which will allow you to send your products request to us, and we shall get in touch with you regarding the same as soon as we can!</h5>
            </div>
          </Fragment>
        : <div>
            <h2 black medium>You have 0 items in your quote cart</h2>
          </div> }
        </div>

      </div>


    );
  }

}
export default Cart;
