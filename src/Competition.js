import React, { Component } from 'react';
import axios from 'axios';

class Competiton extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			      error: null,
			      isLoaded: false,
			      classifications: [],
			      selectedClassification: "",
			      classification: null,
			      newClassification: ""
			    };
	}
	
	componentDidMount() {
		this.loadClassifications();
	  }

  loadClassifications() {
	  const competition = this.props.match.params.competition;
	    axios.get("/api/v1/competition/"+competition+"/classification")
	      .then((result) => {
	        
	          this.setState({
	            isLoaded: true,
	            classifications: result.data,
		    	classification:  (result.data.length > 0 ? result.data[0] : null),
		    	newClassification : ""
	          });
	        },
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
		  	if (classification.name === selectedClassification) {
		  		this.setState({classification: classification});
		  	}
		  }
	  );
  }
  
  saveNewClassification(event) {
	  	
	    const competition = this.props.match.params.competition;
		axios.post("/api/v1/competition/"+competition+"/classification", {name: this.state.newClassification}).then(() => this.loadClassifications());
	  }

setClassification(event) {
	  const value = event.target.value;
	  this.setState({newClassification: value});
}
  
  render() {
	  const { error, isLoaded, classifications, classification, newClassification } = this.state;
	    if (error) {
	      return <div>Error: {error.message}</div>;
	    } else if (!isLoaded) {
	      return <div>Loading...</div>;
	    } else {
	    	
	    	let optionItems = classifications.map((classification) =>
            	<option key={classification.name}>{classification.name}</option>
	    	);
	    	
	    	let positions = "";
	    	if (classification && classification.positions) {
	
	    		positions = classification.positions.map((position) =>
	    			<tr key={position.position}>
	    				<td>{position.position}</td>
	    				<td>{position.participant}</td>
	    				<td>{position.points}</td>
	    			</tr>
	    		);
	    		positions = <table><thead><tr><th>Position</th><th>Participant</th><th>Points</th></tr></thead><tbody>{positions}</tbody></table>;
	    	}
	    	
	    	const competition = this.props.match.params.competition; 
	    	let result = "";
	    	if (classification) {
	    		result = <span><a href={"/competition/"+competition+"/classification/"+classification.name+"/results"}>View results</a></span>;
	    	}
	    	
	      return (
	    		  <div>
		    		  <div>
		  		  	  	<a href="/">Competitions</a> &#9658; 
		  		  	  	<a href={"/competition/" + competition}>{competition}</a>
		  		  	  </div>
	    		  <div>
	    		  	<span>Select classification: </span>
		              <select 
		              	onChange={(e) => this.selectClassification(e.target.value)}>
		                 {optionItems}
		              </select>
		              <span> or </span>
		        	  <input type="text" onChange={ this.setClassification.bind(this) } value={ newClassification } />
		        	  <button type="button" onClick={this.saveNewClassification.bind(this)} >Add new</button>
	              </div>
	              <div>
	    		  	{result}
	    		  </div>
	    		  <div>
	    		  	{positions}
	    		  </div>
	          </div>
	      );
	    }
  }
}

export default Competiton;
