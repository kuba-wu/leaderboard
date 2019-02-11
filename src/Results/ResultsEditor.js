import React, { Component } from 'react';
import axios from 'axios';

class ResultsEditor extends Component {
	
	constructor(props) {
		super(props);
		this.state = this.createNewResult();
	}
	
  resetNewResult() {
	  this.setState(this.createNewResult());
  }

  createNewResult() {
	  return {newResult : {date: (new Date()).toISOString().slice(0, 10), results: [{participant: "dummy", result: ""}]}};
  }
  
  addRow() {
	  let newResult = this.state.newResult;
	  newResult.results.push({participant: "dummy", result: ""});
	  this.setState({newResult : newResult});
  }
  
  setParticipant(index, event) {
	  const newResult = this.state.newResult;
	  newResult.results[index].participant = event.target.value;
	  this.setState({newResult : newResult});
  }
  
  setPosition(index, event) {
	  const newResult = this.state.newResult;
	  newResult.results[index].result = event.target.value;
	  this.setState({newResult : newResult});
  }
  
  setDate(event) {
	  const newResult = this.state.newResult;
	  newResult.date = event.target.value;
	  this.setState({newResult: newResult});
  }
 
  saveNewResult() {

	const competition = this.props.competition; 
	const classification = this.props.classification;
	const body = this.state.newResult;
	
	axios
		.post("/api/v1/competition/"+competition+"/classification/"+classification+"/results", body)
		.then(() => {this.props.loadResults(); this.resetNewResult();});

  }
  
  render() {

	  const newResult = this.state.newResult;
      let newResults = newResult.results.map((singleResult, index) =>
	  	  <tr key={index}>
			  <td><input type="text" onChange={ this.setParticipant.bind(this, index) } value={ singleResult.participant } /></td>
			  <td><input type="text" onChange={ this.setPosition.bind(this, index) } value={ singleResult.result } /></td>
		  </tr>);
    	
      return (
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
      );
    }
}

export default ResultsEditor;
