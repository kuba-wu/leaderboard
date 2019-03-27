import React, { Component } from 'react';

class CompetitionLink extends Component {
	
	render() {
		const competition = this.props.competition;
		return competition ? (<span><a href={"/competition/" + competition}>{competition}</a>  &#9658; </span>) : null;
	}
}

class ResultsLink extends Component {
	
	render() {
		const competition = this.props.competition;
		const results = this.props.results;
		return results ? (<span><a href={"/competition/" + competition+"/results"}>{competition+" results"}</a></span>) : null;
	}
}

class ClassificationLink extends Component {

	render() {
		const competition = this.props.competition;
		const classification = this.props.classification;
		return classification ? (<span><a href={"/competition/" + competition+"/classification/"+classification}>{classification}</a></span>) : null;
	}
}

export { CompetitionLink, ResultsLink, ClassificationLink }