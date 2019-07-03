
import React, { Component } from 'react';

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
                    <h4 className="black medium">{selectedLoadCap}</h4>
                    </div>
                    <div className="BracketConfig config">
                    <h4 className="beige antique">BRACKET TYPE</h4>
                    <h4 className="black medium">{selectedBracket}</h4>
                    {selectedBraking !== null && <h4 className="black medium"><span className="regular">with </span>{selectedBraking}</h4>}
                    </div>
                  </div>
                  <div className="itemActions">
                    <button className="tertiary">
                      <h4 className="black regular">edit</h4>
                    </button>
                    <div className="divider"></div>
                    <button className="tertiary" data-id={index} onClick={(e) => this.props.deleteCartItem(e.currentTarget.dataset.id)}>
                      <h4 className="orange regular">delete</h4>
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

        })}
        <button className="primary confirmCartBtn"><h4 className="black antique">CONFIRM AND PROCEED TO REQUEST QUOTE</h4></button>
        </div>

      </div>


    );
  }

}
export default Cart;
