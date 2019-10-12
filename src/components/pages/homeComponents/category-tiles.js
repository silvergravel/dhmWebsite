import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';

var data = require('../../../data/category-tile-content.json');

var placeholderImg = "product-images/placeholder.gif"

class CategoryTiles extends Component {

  constructor(){
    super();
    this.state = {
       categoryTileContent: [],
       imageReadyStatus: {}
    };
  }

  componentDidMount(){
    let categoryTileContent = data.content.map(content => {


        var img = {};
        img[content.code+"_img"] = new Image();
        img[content.code+"_img"].src = content.image; // by setting an src, you trigger browser download

        img[content.code+"_img"].onload = () => {
          // when it finishes loading, update the component state

          this.setState({ imageReadyStatus: {...this.state.imageReadyStatus, [content.code+"_img"]: true} });

        }
      })



  }

  render(){

    console.log(this.state.imageReadyStatus);
    const {imageReadyStatus} = this.state;

    return(


      <div className="container primary-categories">
          <h4 className="black medium section__title">Explore Our Product Categories</h4>
          <div className="row primary-categories__card-grid">
            {
              data.content.map(content => {
                  return(
                    <div key={content.heading}>
                    <Link to={content.redirectUrl}>
                      <div className = "col-md-6 category-card">
                        <div className="category-card__content-wrapper" >
                          <h2 className="black antique category-card__title">{content.heading}</h2>
                          <h4 className="beige medium category-card__sub-title">{content.subHeading}</h4>
                          <div className="category-data">

                            {content.wheelDiameter !== null &&     //if a value exists for 'wheel diameter' then...
                            <div className="category-data__wheel-diameter">
                              <h4 className="beige medium category-data__tag">{content.wheelDiameter.tag}</h4>
                              <h4 className="plus black antique category-data__qty">{content.wheelDiameter.quantity}</h4>
                            </div>
                            }

                            {content.loadCapacity !== null &&     //if a value exists for 'load capacity' then...
                            <div className="category-data__load-capacity">
                              <h4 className="beige medium category-data__tag">{content.loadCapacity.tag}</h4>
                              <h4 className="plus black antique category-data__qty">{content.loadCapacity.quantity}</h4>
                            </div>
                            }

                            {content.tip !== null &&     //if a value exists for 'tip' then...
                            <h6 className="light orange category-data__tip">
                            {content.tip}
                            </h6>
                            }
                          </div>

                          {
                            imageReadyStatus[content.code+"_img"] === true ?
                            <img className="category-card__image" src={content.image} alt="" /> :
                            <div className="skeletonBlock"></div>
                          }
                        </div>
                      </div>
                    </Link>
                    </div>
                  )
                })
            }
          </div>

      </div>
    );
  }
}

export default CategoryTiles;
