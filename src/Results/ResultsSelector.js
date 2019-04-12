import React, {Component} from 'react';
import { withTranslation } from 'react-i18next';


class ResultsSelector extends Component {

    render() {

        const {t} = this.props;
        if (!this.props.results || !this.props.results.length) {
            return null;
        }

        let optionItems = this.props.results.map(
            (result) =>
                <option key={result.id} value={result.id}>{result.date}</option>);

        const selected = (this.props.selected ? this.props.selected.id : "");
        return (
            <div>
                <span>{t('ResultsSelector.Header')}</span>
                <select onChange={(e) => this.props.setSelectedResult(e.target.value)} value={selected}>
                    {optionItems}
                </select>
            </div>
        );
    }
}

export default withTranslation()(ResultsSelector);
