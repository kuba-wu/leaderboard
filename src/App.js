import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';

import CompetitionsList from './CompetitionsList/CompetitionsList';
import Competition from './Competition/Competition';
import Results from './Results/Results';
import Classification from './Classification/Classification';

import './App.css';

class App extends Component {

    render() {

        return (
            <Router>
                <div className="container">
                    <Route exact path="/" component={CompetitionsList}/>
                    <Route exact path="/competition/:competition" component={Competition}/>
                    <Route path="/competition/:competition/:results(results)" component={Results}/>
                    <Route path="/competition/:competition/classification/:classification" component={Classification}/>
                </div>
            </Router>
        );
    }
}

export default App;
