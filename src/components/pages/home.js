import React, { Component } from 'react';

import Banner from './homeComponents/banner'
import CategoryTiles from './homeComponents/category-tiles'
import BestSellers from './homeComponents/best-sellers'


class Home extends Component{
  render(){
    return(
      <div>

        <Banner/>
        <CategoryTiles/>
        <BestSellers/>
        
      </div>

    );
  }
}

export default Home;
