import React from 'react';
import {CompetitionLink, ClassificationLink, ResultsLink} from './Navigation';

export default (Component) => {
	
  return (props) => {
	  
	  const competition = props.match.params.competition; 
	  const classification = props.match.params.classification;
	  const results = props.match.params.results;
	  
	  return (
		  <div>
			  <div>
			  	<span><a href="/">Competitions</a> &#9658;</span> 
			  	<CompetitionLink competition={competition} />
			  	<ResultsLink competition={competition} results={results} />
			  	<ClassificationLink competition={competition} classification={classification} />
			  </div>
			  <Component {...props} />
		  </div>
  )};
};