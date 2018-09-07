import React, { Component } from 'react';

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
              <div className="series-overview">
                <h1>{content.series}</h1>
                <div>
                <h4>{content.wheelDiameter.tag}</h4>
                <h3>{content.wheelDiameter.quantity}</h3>
                </div>
                <div>
                <h4>{content.treadWidth.tag}</h4>
                <h3>{content.treadWidth.quantity}</h3>
                </div>
                <div>
                <h4>{content.bracketOptions.tag}</h4>
                <h3>
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

                </h3>

                </div>
              </div>
              <div className="container-fluid product-tile-block">
              <div className="row">
              { content.items.map(products =>{
                return(
                  <div className = "col-md-3 col-sm-6 product-tile">
                      <div className="tile-content-area">
                        <h1>{products.heading}</h1>
                        <h2>{products.subHeading}</h2>
                        <div className="vital-info">
                          { products.loadCapacity !== null &&
                          <div className="load-capacity-content">
                            <h5>{products.loadCapacity.tag}</h5>
                            <h4>{products.loadCapacity.quantity}</h4>
                          </div>
                          }
                        </div>
                        <img src={products.image} />
                      </div>

                  </div>

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
    return(


      <div className="category-page-content">
            {this.state.categoryPageContent}

      </div>
    );
  }
}


export default CategoryPage;
