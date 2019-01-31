import React, { Component } from 'react';
import {
	  BrowserRouter as Router,
	  Route
	} from 'react-router-dom';

import CompetitionsList from './CompetitionsList';
import Competition from './Competition';
import Results from './Results';

import './App.css';

class App extends Component {
	
  render() {

	      return (
	    		  <Router>
	    	        <div className="container">
	    	          <Route exact path="/" component={CompetitionsList} />
	    	          <Route path="/competition/:competition/classification/:classification/results" component={Results} />
	    	          <Route exact path="/competition/:competition" component={Competition} />
	    	        </div>
	    	      </Router>
	      );
  }
}

export default App;
