import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Competiton extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			      error: null,
			      isLoaded: false,
			      classifications: [],
			      selectedClassification: "",
			      classification: null
			    };
	}
	
	componentDidMount() {
	    fetch("/api/v1/competition/name/classification")
	      .then(res => res.json())
	      .then(
	        (result) => {
	          this.setState({
	            isLoaded: true,
	            classifications: result
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
	
  selectClassification(selectedClassification) {

		  this.state.classifications.map((classification) => {
		  	if (classification.name == selectedClassification) {
		  		this.setState({classification: classification});
		  	}
		  }
	  );
  }
  
  render() {
	  const { error, isLoaded, classifications, classification } = this.state;
	    if (error) {
	      return <div>Error: {error.message}</div>;
	    } else if (!isLoaded) {
	      return <div>Loading...</div>;
	    } else {
	    	
	    	let optionItems = classifications.map((classification) =>
            	<option key={classification.name}>{classification.name}</option>
	    	);
	    	
	    	
	    	let positions = "";
	    	console.log(classification);
	    	if (classification != null && classification.positions != null) {
	    		console.log(classification);	
	    		positions = classification.positions.map((position) =>
	    			<tr key={position.position}>
	    				<td>{position.position}</td>
	    				<td>{position.participant}</td>
	    				<td>{position.points}</td>
	    			</tr>
	    		);
	    		positions = <table><thead><tr><th>Position</th><th>Participant</th><th>Points</th></tr></thead><tbody>{positions}</tbody></table>;
	    	}
	    	
	      return (
	    		  <div>
	    		  <div>
		              <select 
		              onChange={(e) => this.selectClassification(e.target.value)}>
		                 {optionItems}
		              </select>
	              </div>
	          <div>{positions}</div>
	          </div>
	      );
	    }
  }
}

export default Competiton;
