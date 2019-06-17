import React, { Component } from 'react';

import {
  Link
} from 'react-router-dom';

var data = require('../../data/category-page-content.json');
var websiteCopy = require('../../data/website-copy.json');


class CategoryPage extends Component{


  render(){

    var categoryNameString = this.props.match.params.categoryName.split("#");
    var categoryName = categoryNameString[0];

    return(
      <div className="category-page-content">
        { data[categoryName].map((content, index) => {
            return(
                  <div className="series-block" key={index}>
                    <div id={content.code+"-anchor"} class="series-block-anchor"></div>
                    <div className="overview">
                      <div className="container">
                      <div className="row">
                        <h3 className="col-md-2 black medium overview__title">{content.series}</h3>
                        <div className="col-md-10 overview__data__block">
                        <div className="overview__data">
                          <h4 className="beige antique data__tag">{content.wheelDiameter.tag}</h4>
                          <h4 className="black antique data__qty">{content.wheelDiameter.quantity}</h4>
                        </div>
                        <div className="overview__data">
                          <h4 className="beige antique data__tag">{content.treadWidth.tag}</h4>
                          <h4 className="black antique data__qty">{content.treadWidth.quantity}</h4>
                        </div>
                        <div className="overview__data">
                          <h4 className="beige antique data__tag">{content.bracketOptions.tag}</h4>
                          <h4 className="black antique data__qty">
                            { content.bracketOptions.options.map((options, i) =>{
                                return(
                                  <span key={i}>
                                    {options}
                                    <span className="beige">
                                    { i  !== content.bracketOptions.options.length-1 ? " | " : ""}
                                    </span>
                                  </span>
                                )
                              })
                            }
                          </h4>
                        </div>
                        </div>
                        </div>
                       </div>
                     </div>
                     <div className="container product-cards">
                      <div className="row product-cards__card-grid">
                      { content.items.map((product, index) =>{
                          return(
                            <Link key={index} to={{
                              pathname: "/configure" + product.redirectUrl,
                              state: {
                                activeMaterialId: product.id
                              }
                            }}>
                              <div className = "col-lg-4 col-sm-6 product-card">
                                <div className="product-card__content-wrapper">
                                  <h2 className="black light product-card__title">{product.heading}</h2>
                                  <h4 className="black medium product-card__sub-title">{product.subHeading}</h4>
                                  <div className="product-data">
                                    { product.loadCapacity !== null &&
                                      <div>
                                        <h5 className="beige medium product-data__tag">{product.loadCapacity.tag}</h5>
                                        <h4 className="black medium product-data__qty">{product.loadCapacity.quantity}</h4>
                                      </div>
                                    }
                                  </div>
                                  <img className="product-card__image" src={product.image} alt="" />
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

            )
          })
        }
      </div>

    ); //end of render's return()
  } //end of render
} //end of class


export default CategoryPage;
