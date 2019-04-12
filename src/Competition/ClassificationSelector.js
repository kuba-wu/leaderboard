import React, {Component} from 'react';
import { withTranslation } from 'react-i18next';
import Translation from '../Common/Translation'

class ClassificationSelector extends Component {

    selectClassification(classificationId) {

        const selected = this.props.classifications.find(classification => classification.id === classificationId);
        this.props.setClassification(selected);
    }

    render() {
        const {t, classifications, classification} = this.props;
        if (!classifications || !classifications.length) {
          return null;
        }

        let optionItems = classifications.map((classification) =>
            <option key={classification.id} value={classification.id}>{Translation.classification(t, classification)}</option>
        );

        const selectedId = (classification ? classification.id : '');
        return (
            <div>
                <span>{t('ClassificationSelector.select')}</span>
                <select
                    onChange={(e) => this.selectClassification(e.target.value)}
                    value={selectedId}>
                    {optionItems}
                </select>
            </div>
        );
    }
}

export default withTranslation()(ClassificationSelector);
