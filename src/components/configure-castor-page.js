
import React, { Component } from 'react';
import DropdownMaterial from './formComponents/dropdown-material';
import DropdownWheelDia from './formComponents/dropdown-wheelDia';
import InputField from './formComponents/input-field';
import Radio from './formComponents/radio';
import Checkbox from './formComponents/checkbox';

var data = require('../data/configure-castor-content.json');
var productImgPath = require('../data/product-img-path.json');

class ConfigureCastor extends Component{

  constructor(props){
    super(props)

    var itemCode = this.props.match.params.itemCode;
    var itemCodeSplits = itemCode.split("-");

    var activeMaterialId;
    var vitalsOptionsId = 0;

    var bracketOptionsId = data[itemCodeSplits[0]][itemCodeSplits[1]].hasOwnProperty("bracketOptions") === true ? 0 : null;
    var activeGrooveOptionsId = data[itemCodeSplits[0]][itemCodeSplits[1]].hasOwnProperty("grooveOptions") === true ? 0 : null;
    var configurable = data[itemCodeSplits[0]][itemCodeSplits[1]].configurable;
    console.log("configurable: "+configurable);

    var urlParts = this.props.location.pathname.split("/");
    var configCode = urlParts[urlParts.length - 1];

    if(this.props.location.state != undefined){
      activeMaterialId = this.props.location.state.activeMaterialId;
      this.props.history.push(configCode+"-materialOptions:"+activeMaterialId);
    }else{
      activeMaterialId = "chello";
    }

    console.log("active material id: "+activeMaterialId);

    if(itemCodeSplits.length >= 3){
      for(let i = 0; i < itemCodeSplits.length; i++){
      console.log(itemCodeSplits[i]);
        if(itemCodeSplits[i].includes("vitalsOptions")){
          vitalsOptionsId = itemCodeSplits[i].split(":")[1];
          break;
        }
      };

      for(let i = 0; i < itemCodeSplits.length; i++){
      console.log(itemCodeSplits[i]);
        if(itemCodeSplits[i].includes("bracketOptions")){
          bracketOptionsId = itemCodeSplits[i].split(":")[1];
          break;
        }
      };

      if(activeGrooveOptionsId !== null){
        for(let i = 0; i < itemCodeSplits.length; i++){
        console.log(itemCodeSplits[i]);
          if(itemCodeSplits[i].includes("grooveOptions")){
            activeGrooveOptionsId = itemCodeSplits[i].split(":")[1];
            break;
          }
        };
      }
    }






    this.state = {
      activeDutyId:itemCodeSplits[0],
      activeSeriesId:itemCodeSplits[1],
      activematerialOptionsId: itemCodeSplits.length >= 3 ? itemCodeSplits[2].split(":")[1] : activeMaterialId,
      activevitalsOptionsId: vitalsOptionsId,
      activebracketOptionsId: bracketOptionsId,
      activegrooveOptionsId: activeGrooveOptionsId,
      braking: false,
      quantity: 0,
      configurable: true
    }
    this.updateWheelConfig = this.updateWheelConfig.bind(this);
    this.updateInput = this.updateInput.bind(this);
    this.validateAndAddToCart = this.validateAndAddToCart.bind(this);


  }

  updateWheelConfig(evt, id, key){
    this.setState({["active"+key+"Id"]:evt.currentTarget.dataset.id});
    console.log("key is "+key);
    console.log("id "+evt.currentTarget.dataset.id);
    key === "bracketOptions" && evt.currentTarget.dataset.id === "0" &&
    this.setState({braking: false})

    //url update
    var urlUpdateText;
    var urlParts = this.props.location.pathname.split("/");
    var configCode = urlParts[urlParts.length - 1];

    if(key !== "vitalsOptions"){
        urlUpdateText = key+":"+data[this.state.activeDutyId][this.state.activeSeriesId][key][evt.currentTarget.dataset.id].id;
    }else{
      urlUpdateText = key+":"+data[this.state.activeDutyId][this.state.activeSeriesId].materialOptions[this.state.activematerialOptionsId][key][evt.currentTarget.dataset.id].id;
    }


    var configCodeParts = configCode.split("-");
    var isConfigCodeUpdated = false;
    var updatedUrl = "";
    for(var i = 0; i < configCodeParts.length; i++){
      if(configCodeParts[i].includes(key)){
        configCodeParts[i] = urlUpdateText;
        isConfigCodeUpdated = true;
      }
    }
    if(isConfigCodeUpdated){
      for(var i = 0; i < configCodeParts.length; i++){
        updatedUrl += configCodeParts[i];
        console.log("i is: "+i);
        if(i !== configCodeParts.length-1){
          updatedUrl += "-";
        }

      }
    }else{
        updatedUrl = configCode+"-"+urlUpdateText;
    }

    this.props.history.push(updatedUrl);
    // console.log(urlUpdateText);

  }

  updateInput(evt){
    const value = evt.target.type === 'checkbox' ? evt.target.checked : evt.target.value;
    this.setState({[evt.target.name]: value});
  }

  validateAndAddToCart(wheelConfig, configurableStatus){
    this.state.quantity > 0 ? this.props.updateCart(wheelConfig, configurableStatus) : alert("you need to select a quantity to add this item to cart");
  }




  render(){


    console.log("vmo: "+this.state.activevitalsOptionsId);
    const{activeDutyId, activeSeriesId, activematerialOptionsId, activevitalsOptionsId, activebracketOptionsId, activegrooveOptionsId, braking, quantity} = this.state;

    const configurableStatus = data[activeDutyId][activeSeriesId].configurable;
    const activeDuty = data[activeDutyId];
    const activeDutyName = activeDuty.duty;
    const activeSeries = data[activeDutyId][activeSeriesId];
    const activeSeriesName = activeSeries.series;
    const bracketOptions = activebracketOptionsId !== null ? activeSeries.bracketOptions : null;
    const materialOptions = activeSeries.materialOptions;
    const grooveOptions = activegrooveOptionsId !== null ? activeSeries.grooveOptions : null;
    const vitalsOptions = materialOptions[activematerialOptionsId].vitalsOptions;
    
    var activeProductImage;
    activegrooveOptionsId !== null ?
    activeProductImage = productImgPath[activeDuty.code][activeSeries.code][materialOptions[activematerialOptionsId].code][bracketOptions[activebracketOptionsId].code][grooveOptions[activegrooveOptionsId].code]["712"] :
    activebracketOptionsId !== null ?
    activeProductImage = productImgPath[activeDuty.code][activeSeries.code][materialOptions[activematerialOptionsId].code][bracketOptions[activebracketOptionsId].code]["712"]:
    activeProductImage = productImgPath[activeDuty.code][activeSeries.code][materialOptions[activematerialOptionsId].code]["712"];
    ;

    return(

      <div className="config-castor-wrapper container">
        <h4 className="black medium section__title">Build Your Castor</h4>
        <div className="config-panel">
          <div className="series-bar">
            <h4 className="black medium"><span className="black regular">{activeDutyName+" Castors"}</span>{activeSeriesName}</h4>
          </div>
          <div className="config-panel__body row">
            <div className="image-wrapper col-lg-7 col-md-6 col-sm-6 col-12">
              <img src={process.env.PUBLIC_URL + activeProductImage} alt="" />
            </div>
            <div className="config-fields col-lg-5 col-md-6 col-sm-6 col-12">
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
                  activeOptionId= {vitalsOptions[activevitalsOptionsId].id  } //this will become a state variable
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

                {
                  bracketOptions !== null &&

                <div className="config-fields-bracket">
                  <Radio
                    activeOptionId= {bracketOptions[activebracketOptionsId].id} //this will become a state variable
                    label="BRACKET TYPE"
                    list={bracketOptions}
                    updateWheelConfig={this.updateWheelConfig}
                  />

                  <div className="config-fields-bracket-braking">
                    <Checkbox
                    label={bracketOptions[activebracketOptionsId].brakingDescp}
                    disabledClass={bracketOptions[activebracketOptionsId].brakingType === null && "disabled"}
                    checked={braking}
                    name="braking"
                    updateInput ={this.updateInput}
                    />
                  </div>
                </div>
                }

                {
                  grooveOptions !== null &&

                  <div className="config-fields-groove">
                    <Radio
                      activeOptionId= {grooveOptions[activegrooveOptionsId].id} //this will become a state variable
                      label="GROOVE TYPE"
                      list={grooveOptions}
                      updateWheelConfig={this.updateWheelConfig}
                    />
                  </div>
                }

                <div className="config-fields-quantity">
                  <InputField
                  label="QUANTITY"
                  type="number"
                  name="quantity"
                  updateInput ={this.updateInput}
                  min="1"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className= "configure-panel__cta row">
            <div className="col-lg-7 col-md-6 col-sm-6 col-12 secondary_cta_wrapper">
              <div className="cta_cont">
                <button class="secondary"><h4 className="black antique">DOWNLOAD TECHNICAL SPECIFICATIONS</h4></button>
              </div>
              <div className="cta_cont">
                <button class="secondary"><h4 className="black antique">SHARE</h4></button>
              </div>
            </div>
            <div className="col-lg-5 col-md-6 col-sm-6 col-12 primary_cta_wrapper">
              <div className="cta_cont">
                <button class="primary"><h4 className="black antique">REQUEST QUOTE NOW</h4></button>
              </div>
              <div className="cta_cont">
                <button class="primary" onClick={() => this.validateAndAddToCart(this.state, configurableStatus)}><h4 className="black antique">ADD TO QUOTE CART</h4></button>
              </div>
            </div>
          </div>
        </div>
      </div>





    );
  }

}
export default ConfigureCastor;
