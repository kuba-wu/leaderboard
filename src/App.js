import React, { Component } from 'react';
import {
	  BrowserRouter as Router,
	  Route,
	  Link
	} from 'react-router-dom';

	import CompetitionsList from './CompetitionsList';
	import Competition from './Competition';
	

import './App.css';

class App extends Component {
	
  render() {

	      return (
	    		  <Router>
	    	        <div className="container">
	    	          <Route exact path="/" component={CompetitionsList} />
	    	          <Route path="/competition/" component={Competition} />
	    	        </div>
	    	      </Router>
	      );
  }
}

export default App;
