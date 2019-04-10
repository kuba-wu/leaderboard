import React, {Component} from 'react';

import ComponentWithNavigation from '../Common/ComponentWithNavigation';
import {ResultsLink, ClassificationLink} from '../Common/Navigation';
import CompetitionRanking from './CompetitionRanking';
import ClassificationSelector from './ClassificationSelector';
import ClassificationEditor from './ClassificationEditor';
import axios from 'axios';
import { withTranslation } from 'react-i18next';
import Translation from '../Common/Translation'

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

    loadClassificationCallback = (classification) => this.loadClassifications(classification);
    setClassificationCallback = (classification) => this.setState({classification: classification});

    removeClassification(classification) {
        console.log("TODO");
    }

    render() {
        const {t} = this.props;
        const {error, isLoaded, classifications, classification} = this.state;

        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {

            const competition = this.props.match.params.competition;
            return (
                <div>
                    <div>
                        <ResultsLink competition={competition} results={"results"} text={t("Competition.ResultsLink")}/>
                    </div>
                    <div>
                        <ClassificationSelector classifications={classifications} classification={classification} setClassification={this.setClassificationCallback}/>
                        <ClassificationEditor competition={competition} loadClassifications={this.loadClassificationCallback}/>
                    </div>
                    <div>
                        <ClassificationLink competition={competition} classification={classification && classification.name} text={t("Competition.ClassificationLink")}/>
                        <span>
                            <button disabled={!classification} type="button"
                                    onClick={this.removeClassification.bind(this, classification)}>{t("Competition.RemoveButton")} {Translation.classification(t, classification)}</button>
                        </span>
                    </div>

                    <CompetitionRanking positions={classification && classification.positions}/>
                </div>
            );
        }
    }
}

export default withTranslation()(ComponentWithNavigation(Competiton));
