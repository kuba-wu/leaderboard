import React, { Component } from 'react';

class ResultsSelector extends Component {
	
  selectResult(selected) {

		  this.props.results.map((result) => {
		  	if (result.date === selected) {
		  		result.results.sort(function (first, second) {return first.result - second.result});
		  		this.props.setSelectedResult(result);
		  	}
		  }
	  );
  }
  
  render() {

      let optionItems = this.props.results.map(
    		(result) => 
    			<option key={result.date}>{result.date}</option>);
    		
      return (
    		  <div>
    		  	<span>Select results: </span>
	            <select onChange={(e) => this.selectResult(e.target.value)}>
	            	{optionItems}
	            </select>
              </div>
      );
  }
}

export default ResultsSelector;
