import React, { Component } from 'react';

import { HashLink as Link } from 'react-router-hash-link';

var data = require('../../../data/bestsellers-tile-content.json');
var websiteCopy = require('../../../data/website-copy.json');

class BestSellers extends Component {

  constructor(){
    super();
    this.state = {
       bestSellersTileContent: [],
    };
  }

  componentWillMount(){

    let bestSellersTileContent = data.content.map((product, index) => {
      console.log("productRedirectURL: "+product.redirectUrl);
        return(
          <div key={index} className = "col-lg-4 col-sm-6 best-sellers-card">
            <Link smooth to={product.redirectUrl}>
              <div className="best-sellers-card-plus-bar" key={product.results}>
                <div className="best-sellers-card__category-bar">
                  <h4 className="black medium best-sellers-card__category-name">{product.superHeading}</h4>
                </div>
                <div className="best-sellers-card__content-wrapper">
                  <h2 className="black light best-sellers-card__title">{product.heading}</h2>
                  <h4 className="black medium best-sellers-card__sub-title">{product.subHeading}</h4>
                  <div className="product-data">
                    { product.wheelDiameter !== null &&
                    <div className="product-data__wheel-diameter">
                      <h5 className="beige medium product-data__tag">{product.wheelDiameter.tag}</h5>
                      <h4 className="black medium product-data__qty">{product.wheelDiameter.quantity}</h4>
                    </div>
                    }
                    { product.loadCapacity !== null &&
                    <div className="product-data__load-capacity">
                      <h5 className="beige medium product-data__tag">{product.loadCapacity.tag}</h5>
                      <h4 className="black medium product-data__qty">{product.loadCapacity.quantity}</h4>
                    </div>
                    }
                  </div>
                  <img src={product.image} alt="" />
                  <button className="secondary"><h4 className="black antique">
                  { product.meta.groupType === "series" ?
                    websiteCopy.productCardCta.explore :
                    product.meta.configurable === true ?
                    websiteCopy.productCardCta.build :
                    websiteCopy.productCardCta.view
                  }
                  </h4></button>
                </div>
              </div>
            </Link>
          </div>
        )
      })

      this.setState({bestSellersTileContent: bestSellersTileContent});

  }


  render(){
    return(

      <div className="container best-sellers">
        <h4 className="black medium section__title">Best Sellers</h4>
        <div className="row best-sellers__card-grid">
          {this.state.bestSellersTileContent}
        </div>
        <div className="custom-gap-63"></div>
      </div>

    );
  }

}

export default BestSellers;
