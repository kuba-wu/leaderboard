import React, { Component } from 'react';
import {
	  BrowserRouter as Router,
	  Route
	} from 'react-router-dom';

import CompetitionsList from './CompetitionsList';
import Competition from './Competition';
import ResultsList from './ResultsList';

import './App.css';

class App extends Component {
	
  render() {

	      return (
	    		  <Router>
	    	        <div className="container">
	    	          <Route exact path="/" component={CompetitionsList} />
	    	          <Route exact path="/competition/:competition" component={Competition} />
	    	          <Route path="/competition/:competition/classification/:classification/results" component={ResultsList} />
	    	        </div>
	    	      </Router>
	      );
  }
}

export default App;
