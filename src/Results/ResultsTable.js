import React, { Component } from 'react';

class ResultsTable extends Component {
	
  render() {

    	let singleResults = null;

    	if (this.props.result) {
	
    		const result = this.props.result; 
    		singleResults = result.results.map((singleResult) =>
    			<tr key={singleResult.result}>
    				<td>{singleResult.participant}</td>
    				<td>{singleResult.result}</td>
    			</tr>
    		);
    	}

    	
      return (<table>
      			<thead>
      				<tr>
      					<th>Participant</th><th>Result</th>
      				</tr>
      			</thead>
      			<tbody>{singleResults}</tbody>
      		  </table>);
    }
}

export default ResultsTable;
