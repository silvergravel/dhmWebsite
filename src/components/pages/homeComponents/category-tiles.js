import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';

var data = require('../../../data/category-tile-content.json');

class CategoryTiles extends Component {

  constructor(){
    super();
    this.state = {
       categoryTileContent: [],
    };
  }

  componentWillMount(){
    let categoryTileContent = data.content.map(content => {
        return(
          <Link to={content.redirectUrl}>
            <div className = "col-sm-6 col-lg-4 primary-category-tile">
              <div className="tile-content-area" key={content.results}>
                <h2>{content.heading}</h2>
                <h3>{content.subHeading}</h3>
                <div className="vital-info">
                  {content.loadCapacity !== null &&     //if a value exists for 'load capacity' then...
                  <div className="load-capacity-content">
                    <h6>{content.loadCapacity.tag}</h6>
                    <h5>{content.loadCapacity.quantity}</h5>
                  </div>
                  }

                  {content.wheelDiameter !== null &&     //if a value exists for 'wheel diameter' then...
                  <div className="wheel-diameter-content">
                    <h6>{content.wheelDiameter.tag}</h6>
                    <h5>{content.wheelDiameter.quantity}</h5>
                  </div>
                  }

                  {content.tip !== null &&     //if a value exists for 'tip' then...
                  <h6 className="tip">
                  {content.tip}
                  </h6>
                  }
                </div>
                <img src={content.image} />
              </div>
            </div>
          </Link>
        )
      })

      this.setState({categoryTileContent: categoryTileContent});

  }

  render(){
    return(


      <div className="container-fluid">
          <h1 className="general-sub-title">Explore Our Product Categories</h1>
          <div className="row primary-category-grid">
            {this.state.categoryTileContent}
          </div>

      </div>
    );
  }
}

export default CategoryTiles;
