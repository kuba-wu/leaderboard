import React, { Component } from 'react';

class ClassificationSelector extends Component {

  selectClassification(selectedClassification) {

		  this.props.classifications.map((classification) => {
		  	if (classification.name === selectedClassification) {
		  		this.props.setClassification(classification);
		  	}
		  }
	  );
  }

  render() {

	    	
	    	let optionItems = this.props.classifications.map((classification) =>
            	<option key={classification.name}>{classification.name}</option>
	    	);

	
	      return (
	    		  <div>
	    		  	  <span>Select classification: </span>
		              <select 
		              	onChange={(e) => this.selectClassification(e.target.value)}
		              	value={this.props.classification && this.props.classification.name}>
		                 {optionItems}
		              </select>
		          </div>
		         );
	   }
}

export default ClassificationSelector;
