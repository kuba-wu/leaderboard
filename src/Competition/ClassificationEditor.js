import React, {Component} from 'react';
import axios from 'axios';
import { withTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import {ClassificationLink} from '../Common/Navigation';

class ClassificationEditor extends Component {

    constructor(props) {
        super(props);
        this.state = {name: ""}
    }

    createNewClassification() {
        return {
            name: this.state.name,
            mapping: null,
            resultsType: 'POSITION',
            categoryNames: []
        };
    }

    saveNewClassification(event) {

        const competition = this.props.competition;
        axios
            .post(`/api/v1/competition/${competition}/classification`, this.createNewClassification())
            .then((newClassification) => {
                this.props.history.push(ClassificationLink.url(competition, this.state.name));
            });
    }

    setNewClassification(event) {
        const value = event.target.value;
        this.setState({name: value});
    }

    render() {
        const {t} = this.props;

        return (
            <div>
                <input type="text" onChange={this.setNewClassification.bind(this)} value={this.state.name}/>
                <button type="button" onClick={this.saveNewClassification.bind(this)}>{t("ClassificationEditor.AddButton")}</button>
            </div>
        );
    }
}

export default withRouter(withTranslation()(ClassificationEditor));
