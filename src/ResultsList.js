import React, { Component } from 'react';
import ComponentWithNavigation from './ComponentWithNavigation';
import ResultsTable from './ResultsTable';
import ResultsEditor from './ResultsEditor';
import axios from 'axios';

class ResultsList extends Component {
	
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
		this.loadResults();
	  }
	
	loadResults() {
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

  loadResultsCallback = () => this.loadResults();
  
  render() {
	  const competition = this.props.match.params.competition; 
	  const classification = this.props.match.params.classification;
	  const { error, isLoaded, results, result, newResult } = this.state;
	    if (error) {
	      return <div>Error: {error.message}</div>;
	    } else if (!isLoaded) {
	      return <div>Loading...</div>;
	    } else {

    	let optionItems = results.map(
    		(result) => <option key={result.date}>{result.date}</option>);
    	
    	
      return (
    		  <div>
	    		  <div>
	    		  	<span>Select results: </span>
		            <select onChange={(e) => this.selectResult(e.target.value)}>
		            	{optionItems}
		            </select>
	              </div>
	              <div><ResultsTable result={result} /></div>
	              <div><ResultsEditor loadResults={this.loadResultsCallback} competition={competition} classification={classification} /></div>
	          </div>
      );
    }
  }
}

export default ComponentWithNavigation(ResultsList);
