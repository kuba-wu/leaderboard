import React, {Component} from 'react';
import axios from 'axios';
import { withTranslation } from 'react-i18next';

class ResultsEditor extends Component {

    constructor(props) {
        super(props);
        this.state = this.createNewResult();
    }

    resetNewResult() {
        this.setState(this.createNewResult());
    }

    createNewResult() {
        return {
            newResult: {
                date: (new Date()).toISOString().slice(0, 10),
                results: [{participant: "dummy", result: ""}]
            }
        };
    }

    addRow() {
        let newResult = this.state.newResult;
        newResult.results.push({participant: "dummy", result: ""});
        this.setState({newResult: newResult});
    }

    setParticipant(index, event) {
        const newResult = this.state.newResult;
        newResult.results[index].participant = event.target.value;
        this.setState({newResult: newResult});
    }

    setPosition(index, event) {
        const newResult = this.state.newResult;
        newResult.results[index].result = event.target.value;
        this.setState({newResult: newResult});
    }

    setDate(event) {
        const newResult = this.state.newResult;
        newResult.date = event.target.value;
        this.setState({newResult: newResult});
    }

    saveNewResult() {

        const competition = this.props.competition;
        const category = this.props.category;
        const body = this.state.newResult;

        axios
            .post(`/api/v1/competition/${competition}/category/${category}/results`, body)
            .then((result) => {
                this.props.loadResults(this.props.category, result.data);
                this.resetNewResult();
            });

    }

    render() {

        const {t} = this.props;
        const category = this.props.category;
        if (!category) {
            return null;
        }

        const newResult = this.state.newResult;
        let newResults = newResult.results.map((singleResult, index) =>
            <tr key={index}>
                <td><input type="text" onChange={this.setParticipant.bind(this, index)} value={singleResult.participant}/></td>
                <td><input type="text" onChange={this.setPosition.bind(this, index)} value={singleResult.result}/></td>
            </tr>);

        return (
            <div>
                <span>{t('ResultsEditor.Header')}</span>
                <div>
                    <span>Date:</span>
                    <span><input type="text" onChange={this.setDate.bind(this)} value={newResult.date}/></span>
                </div>

                <table>
                    <thead>
                    <tr>
                        <th>{t('ResultsEditor.Participant')}</th>
                        <th>{t('ResultsEditor.Result')}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {newResults}
                    </tbody>
                </table>
                <button type="button" onClick={this.addRow.bind(this)}>{t('ResultsEditor.AddButton')}</button>
                <button type="submit" onClick={this.saveNewResult.bind(this)}>{t('ResultsEditor.SaveButton')}</button>
            </div>
        );
    }
}

export default withTranslation()(ResultsEditor);
