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
import Footer from './components/footer'
import CategoryPage from './components/pages/category-page'
import ConfigureCastor from './components/configure-castor-page'
import ScrollToTop from './components/scroll-to-top'



//stylesheets
import './styles/css/App.css';

class App extends Component {
  render() {
    return (
      <Router onUpdate={() => window.scrollTo(0, 0)}>
        <ScrollToTop>
          <div className="App">
            <Header/>
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/about' component={About} />

                <Route path='/configure/:itemCode' render={props => <ConfigureCastor {...props} /> } />
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
