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
            <div className = "col-sm-6 col-lg-4 category-card">
              <div className="category-card__content-wrapper" key={content.results}>
                <h2 className="black medium category-card__title">{content.heading}</h2>
                <h4 className="beige regular category-card__sub-title">{content.subHeading}</h4>
                <div className="category-data">
                  {content.loadCapacity !== null &&     //if a value exists for 'load capacity' then...
                  <div className="category-data__load-capacity">
                    <h4 className="beige medium category-data__tag">{content.loadCapacity.tag}</h4>
                    <h4 className="plus black medium category-data__qty">{content.loadCapacity.quantity}</h4>
                  </div>
                  }

                  {content.wheelDiameter !== null &&     //if a value exists for 'wheel diameter' then...
                  <div className="category-data__wheel-diameter">
                    <h4 className="beige medium category-data__tag">{content.wheelDiameter.tag}</h4>
                    <h4 className="plus black medium category-data__qty">{content.wheelDiameter.quantity}</h4>
                  </div>
                  }

                  {content.tip !== null &&     //if a value exists for 'tip' then...
                  <h6 className="light orange category-data__tip">
                  {content.tip}
                  </h6>
                  }
                </div>
                <img className="category-card__image" src={content.image} />
              </div>
            </div>
          </Link>
        )
      })

      this.setState({categoryTileContent: categoryTileContent});

  }

  render(){
    return(


      <div className="container-fluid primary-categories">
          <h3 className="black medium primary-categories__title">Explore Our Product Categories</h3>
          <div className="row primary-categories__card-grid">
            {this.state.categoryTileContent}
          </div>

      </div>
    );
  }
}

export default CategoryTiles;
