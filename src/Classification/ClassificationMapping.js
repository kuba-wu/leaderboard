import React, { Component } from 'react';
import axios from 'axios';
import { withTranslation } from 'react-i18next';

class ClassificationMapping extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			mapping: props.mapping
		};
	}
	
  saveMapping() {

		const competition = this.props.competition; 
		const classification = this.props.classification;
		const body = this.state.mapping;
		
		axios
			.post(`/api/v1/competition/${competition}/classification/${classification}/positionMapping`, body)
			.then(() => this.props.loadClassifications());
	  }
	
  addPosition() {
	  const mapping = this.state.mapping;
	  mapping.positionToPoints.push(0);
	  this.setState({mapping: mapping});
  }
  
  setPoints(index, event) {
	  const mapping = this.state.mapping;
	  mapping.positionToPoints[index] = event.target.value;
	  this.setState({mapping: mapping});
  }

  render() {
	  const {t} = this.props;

	  if (!this.state.mapping) {
		  return null;
 	  }

      const mapping = this.state.mapping.positionToPoints.map((points, index) =>
		<tr key={index+1}>
			<td>{index+1}</td>
			<td><input type="number" onChange={ this.setPoints.bind(this, index) } value={ points } /></td>
		</tr>);
      
		return (
			<div>
				<h2>{t("ClassificationMapping.Heading")}</h2>
				<table>
					<thead>
						<tr>
							<th>{t("ClassificationMapping.Position")}</th><th>{t("ClassificationMapping.Points")}</th>
						</tr>
					</thead>
					<tbody>{mapping}</tbody>
				</table>
				<button type="button" onClick={ this.addPosition.bind(this)}>{t("ClassificationMapping.AddButton")}</button>
	          	<button type="submit" onClick={ this.saveMapping.bind(this) }>{t("ClassificationMapping.SaveButton")}</button>
			</div>);
  }
}

export default withTranslation()(ClassificationMapping);
