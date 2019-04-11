
import React, { Component } from 'react';
import DropdownMaterial from './formComponents/dropdown-material';
import DropdownWheelDia from './formComponents/dropdown-wheelDia';
import InputField from './formComponents/input-field';
import Radio from './formComponents/radio';
import Checkbox from './formComponents/checkbox';

var data = require('../data/configure-castor-content.json');

class ConfigureCastor extends Component{

  constructor(props){
    super(props)


    var itemCode = this.props.match.params.itemCode;
    var itemCodeSplits = itemCode.split("-");

    var activeMaterialId = this.props.location.state.activeMaterialId;


    this.state = {
      activeDutyId:itemCodeSplits[0],
      activeSeriesId:itemCodeSplits[1],
      activematerialOptionsId: activeMaterialId,
      activevitalsOptionsId: 0,
      activebracketOptionsId: 0,
      braking: false,
      quantity: ''


    }
    this.updateWheelConfig = this.updateWheelConfig.bind(this);
    this.updateInput = this.updateInput.bind(this);
  }

  updateWheelConfig(evt, id, key){
    this.setState({["active"+key+"Id"]:evt.currentTarget.dataset.id});
  }

  updateInput(evt){
    const value = evt.target.type === 'checkbox' ? evt.target.checked : evt.target.value;
    this.setState({[evt.target.name]: value});
  }

  render(){

    const{activeDutyId, activeSeriesId, activematerialOptionsId, activevitalsOptionsId, activebracketOptionsId, braking, quantity} = this.state;

    const activeSeries = data[activeDutyId][activeSeriesId];
    const activeSeriesName = activeSeries.series;
    const bracketOptions = activeSeries.bracketOptions;
    const materialOptions = activeSeries.materialOptions;
    const vitalsOptions = materialOptions[activematerialOptionsId].vitalsOptions;
    const activeProductImage = materialOptions[activematerialOptionsId].image;


    console.log("activeMaterial: " +materialOptions[activematerialOptionsId].material);
    console.log("activeWheelDia: " +vitalsOptions[activevitalsOptionsId].wheelDiameter);
    console.log("activeLoadCap: " +vitalsOptions[activevitalsOptionsId].loadCapacity);
    console.log("activeBracketOps: " +bracketOptions[activebracketOptionsId].plateType);
    console.log("quantity: " + this.state.quantity);
    console.log("braking: " + this.state.braking);
    return(

      <div className="config-castor-wrapper">
        <h3 className="black medium config-castor__title">Build Your Castor</h3>
        <div className="config-panel">
          <div className="series-bar">
            <h4 className="black antique">{this.state.activeSeries}</h4>
          </div>
          <div className="config-panel__body">
            <div className="image-wrapper">
              <img src={process.env.PUBLIC_URL + activeProductImage} alt="" />
            </div>
            <div className="config-fields">
              <div className="config-field-dd-material">
                <DropdownMaterial
                  activeOptionId= {materialOptions[activematerialOptionsId].id} //this will become a state variable
                  label="WHEEL MATERIAL"
                  list={materialOptions}
                  updateWheelConfig={this.updateWheelConfig}
                />
              </div>

              <div className="config-field-dd-wheel-dia">
                <DropdownWheelDia
                  activeOptionId= {0} //this will become a state variable
                  label="WHEEL DIAMETER <----> LOAD CAPACITY"
                  list={vitalsOptions}
                  updateWheelConfig={this.updateWheelConfig}
                />
              </div>

              <div className="config-fields-vitalsMeta-bracket-quantity">
                <div className="wheel-config-meta">
                  <div>
                  <h5 className="beige antique">TOTAL HEIGHT</h5>
                  <h5 className="beige antique">(wheel + bracket)</h5>
                  <h4 className="black medium">{vitalsOptions[activevitalsOptionsId].totalHeight}</h4>
                  </div>
                  <div>
                  <h5 className="beige antique">WHEEL</h5>
                  <h5 className="beige antique">THICKNESS</h5>
                  <h4 className="black medium">{vitalsOptions[activevitalsOptionsId].treadWidth}</h4>
                  </div>
                </div>

                <div className="config-fields-bracket">
                  <Radio
                    activeOptionId= {0} //this will become a state variable
                    label="BRACKET TYPE"
                    list={bracketOptions}
                    updateWheelConfig={this.updateWheelConfig}
                  />

                  <div className="config-fields-bracket-braking">
                    <Checkbox
                    label={bracketOptions[activebracketOptionsId].brakingDescp}
                    blockClass={bracketOptions[activebracketOptionsId].brakingOptions !== null && "disabled"}
                    checked={braking}
                    name="braking"
                    updateInput ={this.updateInput}
                    />
                  </div>
                  
                </div>

                <div className="config-fields-quantity">
                  <InputField
                  label="QUANTITY"
                  type="number"
                  name="quantity"
                  updateInput ={this.updateInput}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className= "configure-panel__cta">
            <button><h4 className="black antique">DOWNLOAD TECHNICAL SPECIIFCATIONS</h4></button>
            <button><h4 className="black antique">SHARE</h4></button>
            <button><h4 className="black antique">REQUEST QUOTE NOW</h4></button>
            <button><h4 className="black antique">ADD TO QUOTE CART</h4></button>
          </div>
        </div>
      </div>





    );
  }

}
export default ConfigureCastor;
