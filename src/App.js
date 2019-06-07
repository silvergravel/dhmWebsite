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
    this.deleteCartItem = this.deleteCartItem.bind(this);

  }

  updateItemsInCartIcon(){
    var currentItemsInCart = this.state.itemsInCart;
    currentItemsInCart++;
    this.setState({itemsInCart:currentItemsInCart});
    localStorage.setItem("itemsInCart", currentItemsInCart);
  }

  updateCartComponent(configObject){
    this.setState({
      cartItems:[
        configObject,
        ...this.state.cartItems
      ]
    })
    var cartItemsConfig = [...this.state.cartItems,configObject];
    localStorage.setItem("cartItems", JSON.stringify(cartItemsConfig));
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
    });

    
    if(repeat > 0){
      alert("this item already exists in the cart");
    }else{
      this.updateItemsInCartIcon();
      this.updateCartComponent(configObject)
    }
  }

  deleteCartItem(id){
    // let arrayIndex = e.target.id;
    console.log('request to delete item');
    console.log(this.state.cartItems);
    console.log(id);
    var array = [...this.state.cartItems]; // make a separate copy of the array
    array.splice([id], 1);
    this.setState({cartItems: array});
    localStorage.setItem("cartItems", JSON.stringify(array));

    let itemsInCart = this.state.itemsInCart;
    itemsInCart !== 0 && itemsInCart--;
    this.setState({itemsInCart: itemsInCart});
    localStorage.setItem("itemsInCart", itemsInCart);
  }

  hydrateStateWithLocalStorage() {
    // for all items in state
    for (let key in this.state) {
      // if the key exists in localStorage
      if (localStorage.hasOwnProperty(key)) {
        // get the key's value from localStorage
        let value = localStorage.getItem(key);

        // parse the localStorage string and setState
        try {
          value = JSON.parse(value);
          this.setState({ [key]: value });
        } catch (e) {
          // handle empty string
          this.setState({ [key]: value });
        }
      }
    }
  }

  componentDidMount() {
    this.hydrateStateWithLocalStorage();
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
                <Route exact path='/my-quote-cart' render={() => <Cart cartItems={this.state.cartItems} deleteCartItem={this.deleteCartItem} /> } />
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
