import React, { Component } from 'react';

import {
  Link
} from 'react-router-dom';

var data = require('../../data/category-page-content.json');
var websiteCopy = require('../../data/website-copy.json');


class TrolleyCategoryPage extends Component{


  render(){
    var categoryNameString = this.props.match.params.categoryName.split("#");
    var categoryName = categoryNameString[0];

    return(
      <div className="category-page-content">
      <div className="series-block" >

        <div className="container product-cards">
         <div className="row product-cards__card-grid">
        { data[categoryName].map((content, index) => {
            return(
                      <Link key={index} to={{
                        pathname: "/configure" + content.redirectUrl,
                        state: {
                          activeMaterialId: content.id
                        }
                      }}>
                      <div className = "col-lg-4 col-sm-6 product-card" >
                        <div className="product-card__content-wrapper">
                          <h2 className="black light product-card__title"><span>{content.heading}</span></h2>
                          <h4 className="black medium product-card__sub-title"><span>{content.description}</span></h4>
                          <div className="product-data">
                            { content.wheelDiameter !== null &&
                              <div className="product-data__wheel-diameter">
                                <h5 className="beige medium product-data__tag">{content.wheelDiameter.tag}</h5>
                                <h4 className="black medium product-data__qty">{content.wheelDiameter.quantity}</h4>
                              </div>
                            }
                            { content.loadCapacity !== null &&
                              <div className="product-data__load-capacity">
                                <h5 className="beige medium product-data__tag">{content.loadCapacity.tag}</h5>
                                <h4 className="black medium product-data__qty">{content.loadCapacity.quantity}</h4>
                              </div>
                            }
                          </div>
                          <img className={content.code+" product-card__image"} src={content.image} alt="" />
                          <button className="secondary">
                            <h4 className="black antique">
                            { content.configurable === true ?
                              websiteCopy.productCardCta.build :
                              websiteCopy.productCardCta.view
                            }
                            </h4>
                          </button>
                        </div>
                      </div>
                      </Link>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>

    ); //end of render's return()
  } //end of render
} //end of class


export default TrolleyCategoryPage;
