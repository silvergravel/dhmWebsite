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
    let bestSellersTileContent = data.content.map(product => {
        return(
          <div className = "col-md-3 col-sm-6 best-sellers-card">
            <div className="best-sellers-card-plus-bar" key={product.results}>
              <div className="best-sellers-card__category-bar">
                <h4 className="black medium best-sellers-card__category-name">{product.superHeading}</h4>
              </div>
              <div className="best-sellers-card__content-wrapper">
                <h2 className="black light best-sellers-card__title">{product.heading}</h2>
                <h4 className="black medium best-sellers-card__sub-title">{product.subHeading}</h4>
                <div className="product-data">
                  { product.loadCapacity !== null &&
                  <div className="product-data__load-capacity">
                    <h5 className="beige medium product-data__tag">{product.loadCapacity.tag}</h5>
                    <h4 className="black medium product-data__qty">{product.loadCapacity.quantity}</h4>
                  </div>
                  }
                  { product.wheelDiameter !== null &&
                  <div className="product-data__wheel-diameter">
                    <h5 className="beige medium product-data__tag">{product.wheelDiameter.tag}</h5>
                    <h4 className="black medium product-data__qty">{product.wheelDiameter.quantity}</h4>
                  </div>
                  }
                </div>
                <img src={product.image} />
                <button><h4 className="black antique">BUILD YOUR CASTOR</h4></button>
              </div>
            </div>
          </div>
        )
      })

      this.setState({bestSellersTileContent: bestSellersTileContent});

  }


  render(){
    return(

      <div className="container-fluid best-sellers">
        <h3 className="black medium best-sellers__title">Best Sellers</h3>
        <div className="row best-sellers__card-grid">
          {this.state.bestSellersTileContent}
        </div>
      </div>

    );
  }

}

export default BestSellers;
