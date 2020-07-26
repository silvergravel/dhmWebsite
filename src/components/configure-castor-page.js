
import React, { Component, Fragment } from 'react';
import ReactToPrint, {PrintContextConsumer} from 'react-to-print';
import htmlToImage from 'html-to-image';

import DropdownMaterial from './formComponents/dropdown-material';
import DropdownWheelDia from './formComponents/dropdown-wheelDia';
import InputField from './formComponents/input-field';
import Radio from './formComponents/radio';
import Checkbox from './formComponents/checkbox';
import LineArrow from '../images/lineArrow.svg';
import Whatsapp from './icons/Whatsapp';


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
      configurable: true,
      showSavingLoader: false,
      showPopUp: 'none'
    }
    this.updateWheelConfig = this.updateWheelConfig.bind(this);
    this.updateInput = this.updateInput.bind(this);
    this.validateAndAddToCart = this.validateAndAddToCart.bind(this);
    this.createImgFromHtml = this.createImgFromHtml.bind(this);

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

  createImgFromHtml(id){
    this.setState({showSavingLoader: true})
    htmlToImage.toJpeg(document.getElementById(id), { quality: 0.95 })
    .then(function (dataUrl) {
      var link = document.createElement('a');
      link.download = 'product_dhmwheels.jpeg';
      link.href = dataUrl;
      link.click();
      this.setState({showSavingLoader: false})
    }.bind(this));
  }

  showPopUp(bool){
    if(bool === true){
      this.setState({showPopUp: 'block'});
    }else{
      this.setState({showPopUp: 'none'});
    }

  }

  copyToClipboard(){
    let textElem = document.getElementById("share_popup__link_text")
    textElem.select();
    document.execCommand('copy');
    alert('link successfully copied to clipboard!');
  }

  getLinkWhastapp(message) {
    var url = 'https://api.whatsapp.com/send?text=' + encodeURIComponent(message)

    return url
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

    let activeVital = vitalsOptions[activevitalsOptionsId] ? vitalsOptions[activevitalsOptionsId] : vitalsOptions[0];

    const toDownloadRef = React.createRef();

    console.log("SHOW!",this.state.showSavingLoader);

    return(
      <Fragment>
        <div className='share-popup-container' style={{display: this.state.showPopUp}}>
          <div className='share-popup-wrapper'>
            <div className='share-popup'>
              <div className='share-popup__text-group'>
                <h4 className="black medium" style={{paddingBottom:'0.5rem'}}>COPY LINK:</h4>
                <div style={{display:'flex', paddingBottom: '2rem', width: '100%'}}>
                  <input type="text" value={window.location.href} id="share_popup__link_text" />
                  <button className="secondary share-popup__copy-link-btn" onClick={() => this.copyToClipboard()}><h4 className="black regular">COPY</h4></button>
                </div>
                <h4 className="black medium" style={{paddingBottom:'0.5rem'}}>OR</h4>
                <a
                  href={this.getLinkWhastapp('I am interested in this product: ' + window.location.href)}
                  target="_blank"
                  >
                  <button className="primary share-popup__whatsapp-share-btn">
                    <Whatsapp/><h4 className="black antique">SHARE TO WHATSAPP</h4>
                  </button>
                </a>
              </div>
              <div className='share-popup__actions-group' style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                <button className="secondary" onClick={() => this.showPopUp(false)} ><h4 className="black antique">CLOSE</h4></button>
              </div>
            </div>
          </div>
        </div>

        <div className="config-castor-wrapper container">
          { this.state.showSavingLoader &&
            <div style={{
                position: 'fixed',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                width: '300px',
                height:"200px",
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f4f2ed',
                zIndex: '10000',
                border: '1px solid #B5A98C',
                boxShadow: '1px 1px 7px rgba(0,0,0,0.1)'
              }}>
              <h3 style={{ padding: '20px'}} className='black medium'>saving this castor as an image...</h3>
            </div>  }
          <h4 className="black medium section__title">Build Your Castor</h4>
          <div className="config-panel">
            <div id="configContainer" style={{backgroundColor: 'white'}} ref={el => (this.componentRef = el)}>
              <div className="series-bar">
                <h4 className="black medium">
                  <span className="black regular" style={{marginRight: '8px'}}>{activeDutyName+" Castors"}</span>
                  {activeSeriesName}
                </h4>
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
                    activeOptionId= {activeVital ? activeVital.id : vitalsOptions[0].id   } //this will become a state variable
                    label={
                      <div style={{display: 'flex', alignItems: 'center'}}>
                        <div>WHEEL DIAMETER</div>
                      { vitalsOptions.some(d => d.showTreadWidthInDD === true) && <h6 className='h6 beige medium' style={{marginLeft: '4px'}}>( thickness )</h6>}
                        <div style={{display: 'flex', alignItems: 'center', margin: '0 4px'}}><img src={LineArrow} alt="<---->"/></div>
                        <div>LOAD CAPACITY</div>
                      </div> }
                    list={vitalsOptions}
                    updateWheelConfig={this.updateWheelConfig}
                  />
                </div>

                <div className="config-fields-vitalsMeta-bracket-quantity">
                  <div className="wheel-config-meta">
                    <div>
                    <h5 className="beige antique">TOTAL HEIGHT</h5>
                    <h5 className="beige antique">(wheel + bracket)</h5>
                    <h4 className="black medium">{activeVital.totalHeight}</h4>
                    </div>
                    <div>
                    <h5 className="beige antique">WHEEL</h5>
                    <h5 className="beige antique">THICKNESS</h5>
                    <h4 className="black medium">{activeVital.treadWidth}</h4>
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
            </div>
            <div className= "configure-panel__cta row">
              <div className="col-lg-7 col-md-6 col-sm-6 col-12 secondary_cta_wrapper">
                <div className="cta_cont">
                  <button className="secondary" onClick={() => this.createImgFromHtml('configContainer')}><h4 className="black antique">SAVE PAGE</h4></button>
                </div>
                <ReactToPrint content={() => this.componentRef}>
                  <PrintContextConsumer>
                    {({ handlePrint }) => (
                      <div className="cta_cont">
                        <button className="secondary" onClick={handlePrint}>
                          <h4 className="black antique">PRINT PAGE</h4>
                        </button>
                      </div>
                    )}
                  </PrintContextConsumer>
                </ReactToPrint>
                <div className="cta_cont">
                  <button className="secondary" onClick={() => this.showPopUp(true)}><h4 className="black antique">SHARE</h4></button>
                </div>
              </div>
              <div className="col-lg-5 col-md-6 col-sm-6 col-12 primary_cta_wrapper">
                <div className="cta_cont">
                  <button className="primary" onClick={() => this.validateAndAddToCart(this.state, configurableStatus)}><h4 className="black antique">ADD TO QUOTE CART</h4></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>





    );
  }

}
export default ConfigureCastor;
