import React, { Component } from 'react';


import {
  Link
} from 'react-router-dom';

var data = require('../../data/configure-castor-content.json');


class ConfigureCastor extends Component{

  constructor(props){
    super(props);

    var itemCode = this.props.match.params.itemCode;

    var itemCodeSplits = itemCode.split("-");

    //we passed a 'state' variable using the 'link' component on the category-page.js
    var activeMaterial = this.props.location.state.activeMaterial;



    // console.log("these are the props: "+this.props);
    // console.log(this.props.location.state.activeMaterial);

    this.state={
      //breaking the url to use each piece as unique identifiers for variious things
      dutyId:itemCodeSplits[0],
      seriesId:itemCodeSplits[1],
      activeSeries:'',
      activeMaterial: activeMaterial,
      activeLoadCapacity: '',
      activePlateType:'',
      braking:false,
      quantity: '',




    };

    this.handleChange = this.handleChange.bind(this);
    this.handleMaterialChange = this.handleMaterialChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }



  handleChange(event) {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    this.setState({[event.target.name]: value});
  }

  handleMaterialChange(event) {
    this.setState({activeMaterial: event.target.value});
    this.resetLoadCapacity(event.target.value);
  }

  handleSubmit(event) {
    alert("Chosen Series is " + this.state.activeSeries);
    alert("Chosen Material is " + this.state.activeMaterial);
    alert("Chosen Load Capacity is " + this.state.activeLoadCapacity);
    alert("Chosen Plate Type is " + this.state.activePlateType);
    alert("Want Braking? " + this.state.braking);
    alert("Chosen Quantity " + this.state.quantity);
    event.preventDefault();
    }


  resetLoadCapacity(activeMaterial){
    var activeMaterialIndex = data[this.state.dutyId][this.state.seriesId].materialOptions.findIndex(x => x.material===activeMaterial);
    var setLoadCapacityToFirstOption = data[this.state.dutyId][this.state.seriesId].materialOptions[activeMaterialIndex].vitalsOptions[0].loadCapacity;

    this.setState({activeLoadCapacity:setLoadCapacityToFirstOption})
  }


  componentWillMount(){
       let activeSeries = data[this.state.dutyId][this.state.seriesId].series;
       this.resetLoadCapacity(this.state.activeMaterial);

       this.setState({activeSeries:activeSeries});
  }

  render(){

    var activeMaterialIndex = data[this.state.dutyId][this.state.seriesId].materialOptions.findIndex(x => x.material===this.state.activeMaterial);
    var activeBracketOptionIndex = data[this.state.dutyId][this.state.seriesId].bracketOptions.findIndex(x => x.plateType===this.state.activePlateType);


    if(activeBracketOptionIndex >= 0){
      var activeBrakingOption = data[this.state.dutyId][this.state.seriesId].bracketOptions[activeBracketOptionIndex].brakingOptions;
    }else{
      activeBrakingOption = null;
    }
    // console.log("active brakinig option: ");
    // console.log(activeBrakingOption);

    //render wheel image as per activeMaterialIndex (which is essentially set by activeMaterial)
    var activeProductImage = data[this.state.dutyId][this.state.seriesId].materialOptions[activeMaterialIndex].image;
    // console.log(activeProductImage);

    // console.log("active Load Capacity is ");
    // console.log(this.state.activeLoadCapacity);

    var activeVitalsOptionsIndex = data[this.state.dutyId][this.state.seriesId].materialOptions[activeMaterialIndex].vitalsOptions.findIndex(x => x.loadCapacity===this.state.activeLoadCapacity);

    // console.log("active Vitals Options Index is ");
    // console.log(activeVitalsOptionsIndex);

    var activeTotalHeight = data[this.state.dutyId][this.state.seriesId].materialOptions[activeMaterialIndex].vitalsOptions[activeVitalsOptionsIndex].totalHeight;
    var activeTreadWidth = data[this.state.dutyId][this.state.seriesId].materialOptions[activeMaterialIndex].vitalsOptions[activeVitalsOptionsIndex].treadWidth;

    // console.log("active Total Height is ");
    // console.log(activeTotalHeight);
    //
    // console.log("checkbox status is ");
    // console.log(this.state.braking);

    return(

      <div className="configure-castor-wrapper">
        <h3 className="black medium configure-castor__title">Build Your Castor</h3>
        <div className="configure-panel">
          <div className="series-bar">
            <h4 className="black antique">{this.state.activeSeries}</h4>
          </div>
          <div className="configure-panel__body">
            <div className="image-wrapper">
              <img src={process.env.PUBLIC_URL + activeProductImage} alt="" />
            </div>
            <div className="configuration-fields">

              <form onSubmit={this.handleSubmit}>
                  {
                  //INPUT 1: Material Dropdown
                  }
                  <label for="materialsDropdown"className="beige antique">Wheel Material</label>
                    <select id="materialsDropdown" value={this.state.activeMaterial} onChange={this.handleMaterialChange} name="activeMaterial" className="dropdown fields__wheel-material">
                      {
                        //fetching data for the material dropdown options and spitting out the html for it.
                        data[this.state.dutyId][this.state.seriesId].materialOptions.map(options => {
                             return(
                                 <option value={options.material}>
                                     {options.material}
                                 </option>
                             )
                        })
                      }
                    </select>

                    {
                    //INPUT 2: Wheel Dia <---> Load Capacity
                    }
                    <label for="loadCapacityDropdown"className="beige antique">Wheel Diameter  Load Capacity</label>
                    <select id="loadCapacityDropdown" value={this.state.activeLoadCapacity} onChange={this.handleChange} name="activeLoadCapacity" className="dropdown fields__wheel-material">
                    {

                      data[this.state.dutyId][this.state.seriesId].materialOptions[activeMaterialIndex].vitalsOptions.map(options => {

                      return(
                        <option value={options.loadCapacity}>
                        {options.loadCapacity}
                        </option>
                      )

                    })
                  }
                  </select>
                  <h4 className="beige antique data__tag">TOTAL HEIGHT (wheel + bracket)</h4>
                  <h4 className="black antique data__qty">{activeTotalHeight}</h4>
                  <h4 className="beige antique data__tag">WHEEL THICKNESS</h4>
                  <h4 className="black antique data__qty">{activeTreadWidth}</h4>

                  {
                  //INPUT 3: Bracket Type Radio
                  }
                  <label for="bracketOptions" className="beige antique">Bracket Types</label>
                  {
                    //fetching data for the bracktype radio options and spitting out the html for it.
                    data[this.state.dutyId][this.state.seriesId].bracketOptions.map(options => {
                      return(
                        <div id="bracketOptions">
                        <input type="radio" value={options.plateType} name="activePlateType" onChange={this.handleChange} />
                        <span>{options.plateType}</span>

                        </div>
                      )
                    })



                  }
                    {
                      activeBrakingOption !== null &&     //if a value exists for 'tip' then...
                         <div>
                         <input
                           id="brakingCheckbox"
                           name="braking"
                           type="checkbox"
                           checked={this.state.braking}
                           onChange={this.handleChange} />
                          <label for="brakingCheckbox" >{activeBrakingOption}</label>
                         </div>

                    }



                  {
                  //INPUT 5: Quantity
                  }
                 <label for="quantityNumInput" className="beige antique">Quantity</label>
                 <div>
                 <input id="quantityNumInput" type="number" name="quantity" onChange={this.handleChange} />
                 </div>

                 <div>
                 <input type="submit" value="Submit" />
                 </div>
              </form>


            </div>
        </div>
        <div className= "configure-panel__cta">
        <button><h4 className="black antique">DOWNLOAD TECHNICAL SPECIIFCATIONS</h4></button>
        <button><h4 className="black antique">REQUEST QUOTE NOW</h4></button>
        <button><h4 className="black antique">ADD TO QUOTE CART</h4></button>


        </div>

        </div>

      </div>


    );


  }
}

export default ConfigureCastor;
