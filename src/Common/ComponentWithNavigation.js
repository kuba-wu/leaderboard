import React from 'react';
import {ClassificationLink, ResultsLink} from './Navigation';

export default (Component) => {
	
  return (props) => {
	  
	  const competition = props.match.params.competition; 
	  const classification = props.match.params.classification;
	  
	  return (
		  <div>
			  <div>
			  	<span><a href="/">Competitions</a> &#9658;</span> 
			  	<ClassificationLink competition={competition} />
			  	<ResultsLink competition={competition} classification={classification} />
			  </div>
			  <Component {...props} />
		  </div>
  )};
};