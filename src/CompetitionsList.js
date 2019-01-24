import React, { Component } from 'react';
import {
	  BrowserRouter as Router,
	  Route,
	  Link
	} from 'react-router-dom';

import logo from './logo.svg';
import './App.css';

class CompetitionsList extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			      error: null,
			      isLoaded: false,
			      competitions: []
			    };
	}
	
	componentDidMount() {
	    fetch("/api/v1/competition")
	      .then(res => res.json())
	      .then(
	        (result) => {
	          this.setState({
	            isLoaded: true,
	            competitions: result
	          });
	        },
	        // Note: it's important to handle errors here
	        // instead of a catch() block so that we don't swallow
	        // exceptions from actual bugs in components.
	        (error) => {
	          this.setState({
	            isLoaded: true,
	            error
	          });
	        }
	      )
	  }
	
  render() {
	  const { error, isLoaded, competitions } = this.state;
	    if (error) {
	      return <div>Error: {error.message}</div>;
	    } else if (!isLoaded) {
	      return <div>Loading...</div>;
	    } else {
	      return (
	        <ul>
	          {competitions.map(competition => (
	            <li key={competition.name}>
	              <a href={"/competition/" + competition.name}>{competition.name}</a> 
	            </li>
	          ))}
	        </ul>
	      );
	    }
  }
}

export default CompetitionsList;
