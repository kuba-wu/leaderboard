import React, {Component} from 'react';

class CategorySelector extends Component {

    categoryInfo() {
        return (
            <div>
                <span>Category type: {this.props.selected.type}</span>
            </div>
        );
    }

    render() {

        const optionItems = this.props.categories.map(
            (category) =>
                <option key={category.id}>{category.name}</option>);

        const categoryInfo = (this.props.selected ? this.categoryInfo() : null);

        return (
            <div style={{border : '1px solid black', margin: '3px'}}>
                <div>
                    <span>Select category: </span>
                    <select onChange={(e) => this.props.loadResults(e.target.value)}>
                        {optionItems}
                    </select>
                </div>
                {categoryInfo}
            </div>
        );
    }
}

export default CategorySelector;
