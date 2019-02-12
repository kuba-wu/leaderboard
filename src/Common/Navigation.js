import React, { Component } from 'react';

class ClassificationLink extends Component {
	
	render() {
		const competition = this.props.competition;
		return competition ? (<span><a href={"/competition/" + competition}>{competition}</a>  &#9658; </span>) : null;
	}
}

class ResultsLink extends Component {
	
	render() {
		const competition = this.props.competition;
		const classification = this.props.classification;
		return classification ? (<span><a href={"/competition/" + competition+"/classification/"+classification+"/results"}>{classification+" results"}</a></span>) : null;
	}
}

export { ClassificationLink, ResultsLink }