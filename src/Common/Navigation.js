import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';

class CompetitionLink extends Component {
	
	render() {
		const competition = this.props.competition;
		return competition ? (<span><a href={"/competition/" + competition}>{competition}</a>  </span>) : null;
	}
}

class ResultsLinkBase extends Component {

	render() {
		const {t} = this.props;
		const competition = this.props.competition;
		const results = this.props.results;
		const text = (this.props.text ? this.props.text : "\u25BA " + t("Navigation.ResultsLink"));
		return results ? (<span><a href={"/competition/" + competition+"/results"}>{text}</a></span>) : null;
	}
}

class ClassificationLink extends Component {

	static url(competition, classification) {
		return `/competition/${competition}/classification/${classification}`;
	}

	render() {
		const competition = this.props.competition;
		const classification = this.props.classification;
		const text = (this.props.text ? this.props.text : `\u25BA ${classification}`);
		return classification ? (<span><a href={ClassificationLink.url(competition, classification)}>{text}</a></span>) : null;
	}
}

export const ResultsLink  = withTranslation()(ResultsLinkBase);
export { CompetitionLink, ClassificationLink }