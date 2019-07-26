
import React, { Component } from 'react';
import DropdownMaterial from './formComponents/dropdown-material';
import DropdownWheelDia from './formComponents/dropdown-wheelDia';
import InputField from './formComponents/input-field';
import Radio from './formComponents/radio';
import Checkbox from './formComponents/checkbox';

var data = require('../data/configure-castor-content.json');
var productImgPath = require('../data/product-img-path.json');

class ProductDetails extends Component{

  constructor(props){
    super(props)

    var itemCode = this.props.match.params.itemCode;
    var itemCodeSplits = itemCode.split("-");

    var activeMaterialId; //no
    var vitalsOptionsId = 0; //no
    var bracketOptionsId = 0; //no
    var activeGrooveOptionsId = data[itemCodeSplits[0]][itemCodeSplits[1]].hasOwnProperty("grooveOptions") === true ? 0 : null; //no


    var urlParts = this.props.location.pathname.split("/"); //no
    var configCode = urlParts[urlParts.length - 1]; //no
    //
    // if(this.props.location.state != undefined){
    //   activeMaterialId = this.props.location.state.activeMaterialId;
    //   this.props.history.push(configCode+"-materialOptions:"+activeMaterialId);
    // }else{
    //
    // }
    //
    //
    // if(itemCodeSplits.length >= 3){
    //   for(let i = 0; i < itemCodeSplits.length; i++){
    //   console.log(itemCodeSplits[i]);
    //     if(itemCodeSplits[i].includes("vitalsOptions")){
    //       vitalsOptionsId = itemCodeSplits[i].split(":")[1];
    //       break;
    //     }
    //   };
    //
    //   for(let i = 0; i < itemCodeSplits.length; i++){
    //   console.log(itemCodeSplits[i]);
    //     if(itemCodeSplits[i].includes("bracketOptions")){
    //       bracketOptionsId = itemCodeSplits[i].split(":")[1];
    //       break;
    //     }
    //   };
    //
    //   if(activeGrooveOptionsId !== null){
    //     for(let i = 0; i < itemCodeSplits.length; i++){
    //     console.log(itemCodeSplits[i]);
    //       if(itemCodeSplits[i].includes("grooveOptions")){
    //         activeGrooveOptionsId = itemCodeSplits[i].split(":")[1];
    //         break;
    //       }
    //     };
    //   }
    // }






    this.state = {
      activeDutyId:itemCodeSplits[0],
      activeSeriesId:itemCodeSplits[1],
      // activematerialOptionsId: itemCodeSplits.length >= 3 ? itemCodeSplits[2].split(":")[1] : activeMaterialId, //no
      // activevitalsOptionsId: vitalsOptionsId, //no
      // activebracketOptionsId: bracketOptionsId, //no
      // activegrooveOptionsId: activeGrooveOptionsId, //no
      // braking: false, //no
      quantity: 0,
      configurable: false
    }
    this.updateWheelConfig = this.updateWheelConfig.bind(this); //prob not
    this.updateInput = this.updateInput.bind(this);
    this.validateAndAddToCart = this.validateAndAddToCart.bind(this);


  }

  updateWheelConfig(evt, id, key){ //prob not. this whole function.
    this.setState({["active"+key+"Id"]:evt.currentTarget.dataset.id});
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

  validateAndAddToCart(wheelConfig){
    this.state.quantity > 0 ? this.props.updateCart(wheelConfig) : alert("you need to select a quantity to add this item to cart");
  }




  render(){



    // const{activeDutyId, activeSeriesId, activematerialOptionsId, activevitalsOptionsId, activebracketOptionsId, activegrooveOptionsId, braking, quantity} = this.state; //prob not all vars
    const{activeDutyId, activeSeriesId, quantity} = this.state; //prob not all vars

    console.log("configurable?");
    console.log(data[activeDutyId][activeSeriesId].configurable);

    const activeDuty = data[activeDutyId];
    const activeDutyName = activeDuty.duty;
    const activeSeries = data[activeDutyId][activeSeriesId];
    const activeSeriesName = activeSeries.series;
    // const bracketOptions = activeSeries.bracketOptions; //no
    // const materialOptions = activeSeries.materialOptions; //no
    // const grooveOptions = activegrooveOptionsId !== null ? activeSeries.grooveOptions : null; //no
    // const vitalsOptions = materialOptions[activematerialOptionsId].vitalsOptions; //no
    const activeProductImage = productImgPath[activeDuty.code][activeSeries.code]["712"];

    return(

      <div className="config-castor-wrapper only-details-pg container">
        <h4 className="black medium section__title">Product Details</h4>
        <div className="config-panel">
          <div className="series-bar">
            <h4 className="black regular">{activeDutyName}</h4>
          </div>
          <div className="config-panel__body row">
            <div className="image-wrapper col-lg-7 col-md-6 col-sm-6 col-12">
              <img src={process.env.PUBLIC_URL + activeProductImage} alt="" />
            </div>
            <div className="config-fields col-lg-5 col-md-6 col-sm-6 col-12">

              <div className="config-fields-vitalsMeta-bracket-quantity">
                <div>
                  <h2 className="black light product-name">{activeSeriesName}</h2>
                  <div className="product-descp">
                    <h4 className="black medium">sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud</h4>
                  </div>
                </div>
                <div>
                  <h4 className="beige antique product-specs-label">SPECIFICATIONS</h4>
                  <table className="product-specs ">
                    <tr className="beige medium table-header">
                    { data[activeDutyId][activeSeriesId].vitalsOptions[0].vitals.map((vitals, i) =>{
                        return(

                                  <th>{vitals.tag}</th>

                        )
                      })
                    }
                    </tr>
                    <tbody>
                      { data[activeDutyId][activeSeriesId].vitalsOptions.map((options, i) =>{
                          return(
                              <tr className="black antique table-row">
                              {
                                options.vitals.map((vitals, i) =>{
                                  return(
                                    <td>{vitals.value}</td>
                                  )
                                })
                              }
                              </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>
                </div>

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
            <button><h4 className="black antique">DOWNLOAD TECHNICAL SPECIIFCATIONS</h4></button>
            <button><h4 className="black antique">SHARE</h4></button>
            <button><h4 className="black antique">REQUEST QUOTE NOW</h4></button>
            <button onClick={() => this.validateAndAddToCart(this.state)}><h4 className="black antique">ADD TO QUOTE CART</h4></button>
          </div>
        </div>
      </div>





    );
  }

}
export default ProductDetails;
