import React, {Component} from 'react';

import ComponentWithNavigation from '../Common/ComponentWithNavigation';
import {ResultsLink, ClassificationLink} from '../Common/Navigation';
import CompetitionRanking from './CompetitionRanking';
import ClassificationSelector from './ClassificationSelector';
import ClassificationEditor from './ClassificationEditor';
import axios from 'axios';
import {withTranslation} from 'react-i18next';
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

    loadClassifications(preselectedClassification) {
        const competition = this.props.match.params.competition;
        axios.get("/api/v1/competition/" + competition + "/classification")
            .then((result) => {

                    this.setState({
                        isLoaded: true,
                        classifications: result.data,
                        classification: (preselectedClassification ? preselectedClassification : result.data.firstOrNull()),
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

    setClassificationCallback = (classification) => this.setState({classification: classification});

    removeClassification(classification) {
        const competition = this.props.match.params.competition;
        axios.delete(`/api/v1/competition/${competition}/classification/${classification}`)
            .then(() => this.loadClassifications());
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
            const removeButton = `${t("Competition.RemoveButton")} ${Translation.classification(t, classification)}`;
            return (
                <div>
                    <div>
                        <ResultsLink competition={competition} results={"results"} text={t("Competition.ResultsLink")}/>
                    </div>
                    <div>
                        <ClassificationSelector classifications={classifications} classification={classification} setClassification={this.setClassificationCallback}/>
                        <ClassificationEditor competition={competition}/>
                    </div>
                    <div>
                        <ClassificationLink competition={competition} classification={classification && classification.name} text={t("Competition.ClassificationLink")}/>
                        <span>
                            <button disabled={!classification} type="button"
                                    onClick={this.removeClassification.bind(this, classification && classification.name)}>{removeButton}</button>
                        </span>
                    </div>

                    <CompetitionRanking positions={classification && classification.positions}/>
                </div>
            );
        }
    }
}

export default withTranslation()(ComponentWithNavigation(Competiton));
