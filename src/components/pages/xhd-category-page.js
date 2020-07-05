import React, { Component } from 'react';

import {
  Link
} from 'react-router-dom';

var data = require('../../data/category-page-content.json');
var websiteCopy = require('../../data/website-copy.json');


class XhdCategoryPage extends Component{


  render(){

    var categoryNameString = this.props.match.params.categoryName.split("#");
    var categoryName = categoryNameString[0];

    return(
      <div className="category-page-content xhd-page-content">
        { data[categoryName].map((content, index) => {
            return(

                  <div className="series-block" key={index}>
                   <div>
                    <div className="container">
                      <div className="row" style={{alignItems: 'center'}}>
                        <div className = "col-lg-6 xhd-page-content__img-wrapper" style={{display: 'flex', justifyContent: 'center'}}>
                          <img src={content.image} alt=""/>
                        </div>
                        <div className = "col-lg-6 xhd-page-content__text-group">
                          <h1 className="black light">{content.heading}</h1>
                          <h2 className="black regular">{content.description}</h2>
                          <h4 className="black regular" style={{paddingBottom: '20px'}}>If you would like more details about these, best that you get in touch with us directly.</h4>
                          <Link to='/contact'>
                            <button className="primary">
                              <h4 class="black antique">MAKE AN ENQUIRY</h4>
                            </button>
                          </Link>
                        </div>
                      </div>

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


export default XhdCategoryPage;
