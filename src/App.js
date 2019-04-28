import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

//components
import Header from './components/header'
import Home from './components/pages/home'
import About from './components/pages/about'
import Cart from './components/pages/cart'
import Footer from './components/footer'
import CategoryPage from './components/pages/category-page'
import ConfigureCastor from './components/configure-castor-page'
import ScrollToTop from './components/scroll-to-top'



//stylesheets
import './styles/css/App.css';

class App extends Component {

  constructor(){
    super();

    this.state = {
      itemsInCart: "0",
      cartItems: []
    }

    this.updateCart = this.updateCart.bind(this);

  }

  updateItemsInCartIcon(){
    var currentItemsInCart = this.state.itemsInCart;
    currentItemsInCart++;
    this.setState({itemsInCart:currentItemsInCart});
  }

  updateCartComponent(configObject){
    this.setState({
      cartItems:[
        ...this.state.cartItems,
        configObject
      ]
    })
  }

  updateCart(configObject){
    //check if 'item to add' already exists in the cart.
    //basically if there is a match of
    // - Duty
    // - series
    // - Material op
    var repeat = 0;

    this.state.cartItems.map(item => {
      item.activeDutyId === configObject.activeDutyId &&
      item.activeSeriesId === configObject.activeSeriesId &&
      item.activematerialOptionsId === configObject.activematerialOptionsId &&
      repeat++;
    })

    repeat > 0 ?
    alert("this item already exists in the cart") :
    (this.updateItemsInCartIcon(), this.updateCartComponent(configObject))
  }



  render() {

    console.log(this.state);

    return (
      <Router onUpdate={() => window.scrollTo(0, 0)}>
        <ScrollToTop>
          <div className="App">
            <Header itemsInCart={this.state.itemsInCart}/>
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/about' component={About} />
                <Route exact path='/my-quote-cart' render={() => <Cart cartItems={this.state.cartItems} /> } />
                <Route
                  path='/configure/:itemCode'
                  render={props => <ConfigureCastor {...props} updateCart={this.updateCart} /> }
                />
                <Route path='/:categoryName' render={props => <CategoryPage {...props} /> } />
              </Switch>
            <Footer/>
          </div>
          </ScrollToTop>
      </Router>

    );
  }
}

export default App;
