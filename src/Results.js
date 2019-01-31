import React, { Component } from 'react';
import axios from 'axios';

class Results extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			      error: null,
			      isLoaded: false,
			      results: [],
			      selectedResult: "",
			      result: null,
			      newResult: {date: (new Date()).toISOString().slice(0, 10), results: [{participant: "dummy", result: ""}]}
			    };
	}
	
	componentDidMount() {
		
		this.loadClassifications();
	  }
	
	loadClassifications() {
		const competition = this.props.match.params.competition; 
		const classification = this.props.match.params.classification; 

	    axios.get("/api/v1/competition/"+competition+"/classification/"+classification+"/results").then(res => {
	    	const results = res.data;
	    	this.setState({
	            isLoaded: true,
	            results: results,
		    	result:  (results.length > 0 ? results[0] : null),
		    	newResult: {date: (new Date()).toISOString().slice(0, 10), results: [{participant: "dummy", result: ""}]}
	          });
	          
	        }).catch(error => {
	          this.setState({
	            isLoaded: true,
	            error
	          });
	        }
	      );
	}
	
  selectResult(selected) {

		  this.state.results.map((result) => {
		  	if (result.date === selected) {
		  		result.results.sort(function (first, second) {return first.result - second.result});
		  		this.setState({result: result});
		  	}
		  }
	  );
  }
  
  addRow() {
	  let newResult = this.state.newResult;
	  newResult.results.push({participant: "dummy", result: ""});
	  this.setState({newResult : newResult});
  }
  
  setParticipant(index, event) {
	  let newResult = this.state.newResult;
	  newResult.results[index].participant = event.target.value;
	  this.setState({newResult : newResult});
  }
  
  setPosition(index, event) {
	  let newResult = this.state.newResult;
	  newResult.results[index].result = event.target.value;
	  this.setState({newResult : newResult});
  }
  
  setDate(event) {
	  const value = event.target.value;
	  this.setState({newResult: {date: value, results: this.state.newResult.results}});
  }
 
  saveNewResult() {

	const competition = this.props.match.params.competition; 
	const classification = this.props.match.params.classification;
	const body = this.state.newResult;
	
	axios.post("/api/v1/competition/"+competition+"/classification/"+classification+"/results", body).then(() => this.loadClassifications());

  }
  
  render() {
	  const competition = this.props.match.params.competition; 
	  const classification = this.props.match.params.classification;
	  const { error, isLoaded, results, result, newResult } = this.state;
	    if (error) {
	      return <div>Error: {error.message}</div>;
	    } else if (!isLoaded) {
	      return <div>Loading...</div>;
	    } else {

	    	let optionItems = results.map((result) =>
        	<option key={result.date}>{result.date}</option>
    	);
    	
    	let singleResults = "";

    	if (result && result.results) {
	
    		singleResults = result.results.map((singleResult) =>
    			<tr key={singleResult.result}>
    				<td>{singleResult.participant}</td>
    				<td>{singleResult.result}</td>
    			</tr>
    		);
    		singleResults = <table><thead><tr><th>Participant</th><th>Result</th></tr></thead><tbody>{singleResults}</tbody></table>;
    	}
    	
    	let newResults = newResult.results.map((singleResult, index) =>
			<tr key={index}>
			
				<td><input type="text" onChange={ this.setParticipant.bind(this, index) } value={ singleResult.participant } /></td>
				<td><input type="text" onChange={ this.setPosition.bind(this, index) } value={ singleResult.result } /></td>
			</tr>
    	);
    	
      return (
    		  <div>
    		  	  <div>
    		  	  	<a href="/">Competitions</a> &#9658; 
    		  	  	<a href={"/competition/" + competition}>{competition}</a> &#9658; 
    		  	  	<a href={"/competition/" + competition+"/classification/"+classification+"/results"}>{classification+" results"}</a>
    		  	  </div>
	    		  <div>
	    		  	<span>Select results: </span>
		            <select onChange={(e) => this.selectResult(e.target.value)}>
		            	{optionItems}
		            </select>
	              </div>
	              <div>{singleResults}</div>
	              <div>
	              	<span>Add new results</span>
	              	<div>
	              		<span>Date:</span>
	              		<span><input type="text" onChange={ this.setDate.bind(this) } value={ newResult.date } /></span>
	              	</div>

	              	<table>
	              		<thead>
	              			<tr>
	              				<th>Participant</th><th>Result</th>
	              			</tr>
	              		</thead>
	              		<tbody>
	              			{newResults}
	              		</tbody>
	              	</table>
	              	<button type="button" onClick={ this.addRow.bind(this)}>Add next</button>
	              	<button type="submit" onClick={ this.saveNewResult.bind(this) }>Save result</button>
	              </div>
	          </div>
      );
    }
  }
}

export default Results;
