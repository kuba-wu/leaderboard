import React, { Component } from 'react';

import ComponentWithNavigation from '../Common/ComponentWithNavigation';

import axios from 'axios';
import ClassificationMapping from "./ClassificationMapping";
import CompetitionRanking from "../Competition/CompetitionRanking";

class Classification extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            classification: null
        };
    }

    componentDidMount() {
        this.loadClassification();
    }

    loadClassification() {
        const competition = this.props.match.params.competition;
        const classification = this.props.match.params.classification;

        axios.get(`/api/v1/competition/${competition}/classification/${classification}`)
            .then((result) => {

                this.setState({
                    classification: result.data,
                    isLoaded: true
                });
            },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    loadClassificationCallback = () => this.loadClassification();

    render() {
        const { error, isLoaded, classification } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {

            const competition = this.props.match.params.competition;
            const categories = classification.categories.map((category) => category.name).join();
            return (
                <div>
                    <div>
                        <span>Type: {classification.resultsType}</span>
                    </div>
                    <div>
                        <span>Categories: {categories}</span>
                    </div>
                    <ClassificationMapping mapping={classification.mapping} classification={classification.name}
                                           competition={competition} loadClassifications={this.loadClassificationCallback} />
                    <CompetitionRanking positions={classification.positions}/>
                </div>
            );
        }
    }
}

export default ComponentWithNavigation(Classification);
