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
      <div className="category-page-content">
        { data[categoryName].map((content, index) => {
            return(

                  <div className="series-block" key={index}>      
                   <div>
                    <div className="container">
                      <div className="row">
                        <div className = "col-lg-6">
                          <img src={content.image} alt="" />
                        </div>
                        <div className = "col-lg-6">
                          <h2 className="black light">{content.heading}</h2>
                          <h4 className="black medium">{content.description}</h4>
                        </div>
                      </div>
                      <button className="primary">MAKE AN ENQUIRY</button>
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
