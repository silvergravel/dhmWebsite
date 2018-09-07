import React, { Component } from 'react';

var data = require('../../../data/bestsellers-tile-content.json');

class BestSellers extends Component {

  constructor(){
    super();
    this.state = {
       bestSellersTileContent: [],
    };
  }

  componentWillMount(){
    let bestSellersTileContent = data.content.map(content => {
        return(
          <div className = "col-md-3 col-sm-6 best-sellers-tile">
            <div className="tile-content-area-and-bar" key={content.results}>
              <div className="category-bar"><h6>{content.superHeading}</h6></div>
              <div className="tile-content-area">
                <h1>{content.heading}</h1>
                <h2>{content.subHeading}</h2>
                <div className="vital-info">
                  { content.loadCapacity !== null &&
                  <div className="load-capacity-content">
                    <h5>{content.loadCapacity.tag}</h5>
                    <h4>{content.loadCapacity.quantity}</h4>
                  </div>
                  }
                  { content.wheelDiameter !== null &&
                  <div className="wheel-diameter-content">
                    <h5>{content.wheelDiameter.tag}</h5>
                    <h4>{content.wheelDiameter.quantity}</h4>
                  </div>
                  }
                </div>
                <img src={content.image} />
              </div>
            </div>
          </div>
        )
      })

      this.setState({bestSellersTileContent: bestSellersTileContent});

  }


  render(){
    return(

      <div className="container-fluid">
        <h1 className="general-sub-title">Best Sellers</h1>
        <div className="row best-sellers-grid">
          {this.state.bestSellersTileContent}
        </div>
      </div>

    );
  }

}

export default BestSellers;
