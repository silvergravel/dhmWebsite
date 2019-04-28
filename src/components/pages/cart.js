
import React, { Component } from 'react';

var data = require('../../data/configure-castor-content.json');

class Cart extends Component{

  constructor(props){
    super(props);
  }

  render(){



    return(

      <div>
        <p>This is the quote cart</p>
        <p>This is the quote cart</p>
        <p>This is the quote cart</p>
        <p>This is the quote cart</p>
        <p>This is the quote cart</p>
        <p>This is the quote cart</p>
        <p>This is the quote cart</p>
        <p>This is the quote cart</p>
        <p>This is the quote cart</p>
        <div>
        {this.props.cartItems.map((item, index) => {

          const selectedSeries = data[item.activeDutyId][item.activeSeriesId];
          const selectedSeriesName = selectedSeries.series;
          const selectedMaterial = selectedSeries.materialOptions[item.activematerialOptionsId].material;
          const selectedWheelDia = selectedSeries.materialOptions[item.activematerialOptionsId].vitalsOptions[item.activevitalsOptionsId].wheelDiameter;
          const selectedLoadCap = selectedSeries.materialOptions[item.activematerialOptionsId].vitalsOptions[item.activevitalsOptionsId].loadCapacity;
          const selectedBracket = selectedSeries.bracketOptions[item.activebracketOptionsId].plateType;
          const selectedProductImageUrl = selectedSeries.materialOptions[item.activematerialOptionsId].image;

          return(
            <div key={index}>
            <h2>{item.activeDutyId}</h2>
            <h4><span>SERIES: </span>{selectedSeriesName}</h4>
            <p><span>MATERIAL: </span>{selectedMaterial}</p>
            <p><span>WHEEL DIA: </span>{selectedWheelDia}</p>
            <p><span>LOAD CAPACITY: </span>{selectedLoadCap}</p>
            <p><span>BRACKET: </span>{selectedBracket}</p>
            <h6><span>BRAKING: </span>{item.braking}</h6>
            <img src={process.env.PUBLIC_URL + selectedProductImageUrl} alt="" />
            <h1>{item.quantity}</h1>


            </div>
          )

        })}
        </div>
      </div>


    );
  }

}
export default Cart;
