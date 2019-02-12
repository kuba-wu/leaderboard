import React, { Component } from 'react';

import ComponentWithNavigation from '../Common/ComponentWithNavigation';
import { ResultsLink } from '../Common/Navigation';
import CompetitionRanking from './CompetitionRanking';
import ClassificationMapping from './ClassificationMapping';
import ClassificationSelector from './ClassificationSelector';
import ClassificationEditor from './ClassificationEditor';
import axios from 'axios';

class Competiton extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            classifications: [],
            classification: null
        };
    }

    componentDidMount() {
        this.loadClassifications();
    }

    loadClassifications(classification) {
        const competition = this.props.match.params.competition;
        axios.get("/api/v1/competition/" + competition + "/classification")
            .then((result) => {

                this.setState({
                    isLoaded: true,
                    classifications: result.data,
                    classification: (classification ? classification : (result.data.length > 0 ? result.data[0] : null)),
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

    loadClassificiationCallback = (classification) => this.loadClassifications(classification);
    setClassificationCallback = (classification) => this.setState({ classification: classification });

    render() {
        const { error, isLoaded, classifications, classification } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {

            const competition = this.props.match.params.competition;
            return (
                <div>
                    <div>
                        <ClassificationSelector classifications={classifications} classification={classification} setClassification={this.setClassificationCallback} />
                        <span> or </span>
                        <ClassificationEditor competition={competition} loadClassifications={this.loadClassificiationCallback} />
                    </div>
                    <div>
                        <ResultsLink competition={competition} classification={classification ? classification.name : null} />
                    </div>
                    <ClassificationMapping mapping={classification && classification.mapping} classification={classification && classification.name} competition={competition} loadClassifications={this.loadClassificiationCallback} />
                    <CompetitionRanking positions={classification && classification.positions} />
                </div>
            );
        }
    }
}

export default ComponentWithNavigation(Competiton);
