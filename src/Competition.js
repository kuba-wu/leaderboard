import React, { Component } from 'react';
import ComponentWithNavigation from './ComponentWithNavigation';
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

  loadClassifications(classification) {
	  const competition = this.props.match.params.competition;
	    axios.get("/api/v1/competition/"+competition+"/classification")
	      .then((result) => {
	        
	          this.setState({
	            isLoaded: true,
	            classifications: result.data,
		    	classification:  (classification ? classification : (result.data.length > 0 ? result.data[0] : null)),
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
		axios
			.post("/api/v1/competition/"+competition+"/classification", {name: this.state.newClassification})
			.then((newClassification) => this.loadClassifications(newClassification.data));
	  }

	setClassification(event) {
		  const value = event.target.value;
		  this.setState({newClassification: value});
	}
  
  saveMapping() {

		const competition = this.props.match.params.competition; 
		const classification = this.state.classification.name;
		const body = this.state.classification.mapping;
		
		axios
			.post("/api/v1/competition/"+competition+"/classification/"+classification+"/positionMapping", body)
			.then((newClassification) => this.loadClassifications(newClassification.data));
	  }
	
  addPosition() {
	  const classification = this.state.classification;
	  classification.mapping.positionToPoints.push(0);
	  this.setState({classification: classification});
  }
  
  setPoints(index, event) {
	  const classification = this.state.classification
	  classification.mapping.positionToPoints[index] = event.target.value;
	  this.setState({classification: classification});
  }
  
  renderMapping(positionMapping) {
	const mapping = positionMapping.positionToPoints.map((points, index) =>
		<tr key={index+1}>
			<td>{index+1}</td>
			<td><input type="number" onChange={ this.setPoints.bind(this, index) } value={ points } /></td>
		</tr>
	);
	return (
		<div>
			<h2>Position to points mapping</h2>
			<table>
				<thead>
					<tr>
						<th>Position</th><th>Points</th>
					</tr>
				</thead>
				<tbody>{mapping}</tbody>
			</table>
			<button type="button" onClick={ this.addPosition.bind(this)}>Add position</button>
          	<button type="submit" onClick={ this.saveMapping.bind(this) }>Save mapping</button>
		</div>);
  }
  
  renderRanking(positions) {
	  const ranking = positions.map((position) =>
		<tr key={position.position}>
			<td>{position.position}</td>
			<td>{position.participant}</td>
			<td>{position.points}</td>
		</tr>
	  );
	  return (
		  <div>
	  		<h2>Current ranking</h2>
	  		<table>
	  			<thead>
	  				<tr>
	  					<th>Position</th><th>Participant</th><th>Points</th>
	  				</tr>
	  			</thead>
	  			<tbody>{ranking}</tbody>
	  		</table>
	  	</div>);
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

	    	const competition = this.props.match.params.competition; 
	    	let mapping = "";
	    	let ranking = "";
	    	let resultsLink = "";
	    	
	    	if (classification) {
	
	    		mapping = this.renderMapping(classification.mapping);
	    		ranking = this.renderRanking(classification.positions);
	    		
		    	resultsLink = <span><a href={"/competition/"+competition+"/classification/"+classification.name+"/results"}>View results</a></span>;
	    	}	    	
	    	
	      return (
	    		<div>
	    		  <div>
	    		  	<span>Select classification: </span>
		              <select 
		              	onChange={(e) => this.selectClassification(e.target.value)}
		              	value={classification && classification.name}>
		                 {optionItems}
		              </select>
		              <span> or </span>
		        	  <input type="text" onChange={ this.setClassification.bind(this) } value={ newClassification } />
		        	  <button type="button" onClick={this.saveNewClassification.bind(this)} >Add new</button>
	              </div>
	              <div>
	    		  	{resultsLink}
	    		  </div>
	    		  <div>
	    		  	{mapping}
	    		  </div>
	    		  <div>
	    		  	{ranking}
	    		  </div>
	          </div>
	      );
	    }
  }
}

export default ComponentWithNavigation(Competiton);
