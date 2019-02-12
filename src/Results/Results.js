import React, { Component } from 'react';
import ComponentWithNavigation from '../Common/ComponentWithNavigation';
import ResultsTable from './ResultsTable';
import ResultsEditor from './ResultsEditor';
import ResultsSelector from './ResultsSelector';
import axios from 'axios';

class Results extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			      error: null,
			      isLoaded: false,
			      results: [],
			      selectedResult: "",
			      result: null			    
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
		    	result:  (results.length > 0 ? results[0] : null)
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
  setSelectedResultCallback = (result) => this.setState({result: result});
  
  render() {
	  const competition = this.props.match.params.competition; 
	  const classification = this.props.match.params.classification;
	  const { error, isLoaded, results, result } = this.state;
	    if (error) {
	      return <div>Error: {error.message}</div>;
	    } else if (!isLoaded) {
	      return <div>Loading...</div>;
	    } else {

      return (
    		  <div>
	    		  <div><ResultsSelector results={results} setSelectedResult={this.setSelectedResultCallback}/></div>
	              <div><ResultsTable result={result} /></div>
	              <div><ResultsEditor loadResults={this.loadResultsCallback} competition={competition} classification={classification} /></div>
	          </div>
      );
    }
  }
}

export default ComponentWithNavigation(Results);
