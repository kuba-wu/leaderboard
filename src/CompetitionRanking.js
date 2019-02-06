import React, { Component } from 'react';

class CompetitionRanking extends Component {
	
  render() {
	  const ranking = this.props.positions.map((position) =>
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
}

export default CompetitionRanking;
