import React, { Component } from 'react';

import PlaceholderCastor from '../../images/placeholder.png';

import {
  Link
} from 'react-router-dom';

var data = require('../../data/configure-castor-content-bkup.json');


class ConfigureCastor extends Component{

  constructor(props){
    super(props);

    var itemCode = this.props.match.params.itemCode;
    var itemCodeSplits = itemCode.split("-");


    this.state={
      //breaking the url to use each piece as unique identifiers for variious things
      dutyId:itemCodeSplits[0],
      seriesId:itemCodeSplits[1],
      activeSeries:'',
      activeMaterialId: itemCodeSplits[2],
      bracketOptionsContent: [],
      brakingOptionsContent: [],
      materialDropdownContent: [],
    };

    this.handleChange = this.handleChange.bind(this);


  }

  handleChange(event) {
    this.setState({activeMaterialId: event.target.value});

  }



  componentWillMount(){

      //storing data for the material dropdown options
       let materialDropdownContent = data[this.state.dutyId][this.state.seriesId].materialOptions.map(options => {
            return(
                <option value={options.id}>{options.material}</option>
            )
       })

       let activeSeries = data[this.state.dutyId][this.state.seriesId].series;




       this.setState({materialDropdownContent:materialDropdownContent});
       this.setState({activeSeries:activeSeries});

  }

  render(){

    var activeIndex = data[this.state.dutyId][this.state.seriesId].materialOptions.findIndex(x => x.id==this.state.activeMaterialId);

    //render wheel image as per activeIndex (which is essentially set by activeMaterial)
    var activeProductImage = data[this.state.dutyId][this.state.seriesId].materialOptions[activeIndex].image;


    return(

      <div className="configure-castor-wrapper">

        <h3 className="black medium configure-castor__title">Build Your Castor</h3>


        <div className="configure-panel">
          <div className="series-bar">
            <h4 className="black antique">{this.state.activeSeries}</h4>
          </div>
          <div className="configure-panel__body">
            <div className="image-wrapper">
              <img src={activeProductImage} />
            </div>
            <div className="configuration-fields">

              <form>
                  <label className="beige antique">
                    Wheel Material
                   
                    <select value={this.state.activeMaterialId} onChange={this.handleChange} className="dropdown fields__wheel-material">
                      {this.state.materialDropdownContent}
                    </select>
                  </label>



                 <h4 className= "beige antique">quantity</h4>
                 <input type="submit" value="Submit" />
              </form>

              <div>
              {

                data[this.state.dutyId][this.state.seriesId].materialOptions[activeIndex].vitalsOptions.map(options => {

                return(
                  <div>

                  <p>{options.loadCapacity}</p>
                  </div>
                )

              })
            }
            </div>
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
