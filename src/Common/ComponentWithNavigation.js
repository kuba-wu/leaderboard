import React from 'react';

export default (Component) => {
	
  return (props) => {
	  
	  const competition = props.match.params.competition; 
	  const classification = props.match.params.classification;
	  
	  return (
		  <div>
			  <div>
			  	<span><a href="/">Competitions</a> &#9658;</span> 
			  	{competition && (<span><a href={"/competition/" + competition}>{competition}</a>  &#9658; </span>)} 
			  	{classification && (<span><a href={"/competition/" + competition+"/classification/"+classification+"/results"}>{classification+" results"}</a></span>)}
			  </div>
			  <Component {...props} />
		  </div>
  )};
};