import React, { Component } from 'react';

import {
  Link
} from 'react-router-dom';

var data = require('../../data/category-page-content.json');


class CategoryPage extends Component{

  constructor(props){
    super(props);
    this.state={
      categoryName: this.props.match.params.categoryName,
      categoryPageContent: []
    };

  }

  componentWillMount(){

    let categoryPageContent = data[this.state.categoryName].map(content => {
        return(
            <div className="series-block">
              <div className="overview">
                <h3 className="black medium overview__title">{content.series}</h3>
                <div className="overview__data">
                <h4 className="beige antique data__tag">{content.wheelDiameter.tag}</h4>
                <h4 className="black antique data__qty">{content.wheelDiameter.quantity}</h4>
                </div>
                <div>
                <h4 className="beige antique data__tag">{content.treadWidth.tag}</h4>
                <h4 className="black antique data__qty">{content.treadWidth.quantity}</h4>
                </div>
                <div>
                <h4 className="beige antique data__tag">{content.bracketOptions.tag}</h4>
                <h4 className="black antique data__qty">
                { content.bracketOptions.options.map(options =>{
                    return(
                      <span> {options} <span className="beige">|</span></span>
                    )
                  })
                }
                <br />
                {
                  content.bracketOptions.wheelLock !== null &&
                  [
                  <span className="beige">with </span>,
                  content.bracketOptions.wheelLock.map(types =>{
                      return(
                        <span>{types}<span className="beige"> | </span></span>
                        )
                      })
                  ]
                }
                </h4>

                </div>
              </div>
              <div className="container-fluid product-cards">
              <div className="row product-cards__card-grid">
              { content.items.map(product =>{
                return(
                  <Link to={"/configure" + product.redirectUrl}>
                  <div className = "col-md-3 col-sm-6 product-card">
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
                        <img className="product-card__image" src={product.image} />

                        <button><h4 className="black antique">BUILD YOUR CASTOR</h4></button>

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

      this.setState({categoryPageContent: categoryPageContent});

  }

  render(){

    console.log(this.state.categoryPageContent);
    return(


      <div className="category-page-content">
            {this.state.categoryPageContent}

      </div>
    );
  }
}


export default CategoryPage;
