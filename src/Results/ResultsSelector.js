import React, {Component} from 'react';

class ResultsSelector extends Component {

    render() {

        if (!this.props.results || !this.props.results.length) {
            return null;
        }

        let optionItems = this.props.results.map(
            (result) =>
                <option key={result.id} value={result.id}>{result.date}</option>);

        return (
            <div>
                <span>Select results: </span>
                <select onChange={(e) => this.props.setSelectedResult(e.target.value)} value={this.props.selected && this.props.selected.id}>
                    {optionItems}
                </select>
            </div>
        );
    }
}

export default ResultsSelector;
