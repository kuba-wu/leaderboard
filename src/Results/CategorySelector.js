import React, {Component} from 'react';
import {withTranslation} from 'react-i18next';
import Translation from '../Common/Translation';

class CategorySelector extends Component {

    categoryInfo() {
        const {t} = this.props;
        const typeName = Translation.type(t, this.props.selected);
        return (
            <div>
                <span>{t("CategorySelector.Type")}{typeName}</span>
            </div>
        );
    }

    render() {

      const {categories, selected} = this.props;

      if (!categories || !categories.length) {
          return null;
      }

        const optionItems = categories.map(
            (category) =>
                <option key={category.id} value={category.id}>{category.name}</option>);

        const categoryInfo = (selected ? this.categoryInfo() : null);

        return (
            <div style={{border: '1px solid black', margin: '3px'}}>
                <div>
                    <span></span>
                    <select onChange={(e) => this.props.loadResults(e.target.value)}>
                        {optionItems}
                    </select>
                </div>
                {categoryInfo}
            </div>
        );
    }
}

export default withTranslation()(CategorySelector);
