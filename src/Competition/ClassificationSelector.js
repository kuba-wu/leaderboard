import React, {Component} from 'react';
import { withTranslation } from 'react-i18next';
import Translation from '../Common/Translation'

class ClassificationSelector extends Component {

    selectClassification(selectedClassification) {

        this.props.classifications.map((classification) => {
                if (classification.name === selectedClassification) {
                    this.props.setClassification(classification);
                }
            }
        );
    }

    render() {
        const {t} = this.props;

        let optionItems = this.props.classifications.map((classification) =>
            <option key={classification.id} value={classification.name}>{Translation.classification(t, classification)}</option>
        );

        return (
            <div>
                <span>{t('ClassificationSelector.select')}</span>
                <select
                    onChange={(e) => this.selectClassification(e.target.value)}
                    value={this.props.classification && this.props.classification.name}>
                    {optionItems}
                </select>
            </div>
        );
    }
}

export default withTranslation()(ClassificationSelector);
