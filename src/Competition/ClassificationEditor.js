import React, {Component} from 'react';
import axios from 'axios';
import { withTranslation } from 'react-i18next';

class ClassificationEditor extends Component {

    constructor(props) {
        super(props);
        this.state = {newClassification: ""}
    }

    saveNewClassification(event) {

        const competition = this.props.competition;
        axios
            .post("/api/v1/competition/" + competition + "/classification", {name: this.state.newClassification})
            .then((newClassification) => {
                this.props.loadClassifications(newClassification.data);
                this.setState({newClassification: ""})
            });
    }

    setNewClassification(event) {
        const value = event.target.value;
        this.setState({newClassification: value});
    }

    render() {
        const {t} = this.props;

        return (
            <div>
                <input type="text" onChange={this.setNewClassification.bind(this)} value={this.state.newClassification}/>
                <button type="button" onClick={this.saveNewClassification.bind(this)}>{t("ClassificationEditor.AddButton")}</button>
            </div>
        );
    }
}

export default withTranslation()(ClassificationEditor);
