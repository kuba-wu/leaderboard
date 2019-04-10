import React, {Component} from 'react';
import ComponentWithNavigation from '../Common/ComponentWithNavigation';
import ResultsTable from './ResultsTable';
import ResultsEditor from './ResultsEditor';
import ResultsSelector from './ResultsSelector';
import CategorySelector from './CategorySelector';
import axios from 'axios';

class Results extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            results: [],
            result: null,
            categories: [],
            category: null
        };
    }

    componentDidMount() {
        this.loadCategories();
    }

    loadCategories() {
        const competition = this.props.match.params.competition;

        axios.get(`/api/v1/competition/${competition}/category`).then(res => {
            const categories = res.data;
            this.setState({
                isLoaded: true,
                categories: categories,
                category: (categories.length > 0 ? categories[0] : null)
            });

        }).catch(error => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        );
    }

    loadResults(categoryId, preselectedResult) {
        const competition = this.props.match.params.competition;

        const selected = this.state.categories.filter(category =>  (categoryId === category.id))[0];

        axios.get(`/api/v1/competition/${competition}/category/${selected.name}/results`).then(res => {
            const results = res.data.sort(function (first, second) {
                return first.date.localeCompare(second.date);
            });
            const firstResult = (results.length > 0 ? results[0] : null);
            this.setState({
                isLoaded: true,
                results: results,
                result: (preselectedResult ? preselectedResult : firstResult),
                category: selected
            });

        }).catch(error => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        );
    }

    render() {
        const competition = this.props.match.params.competition;
        const {error, isLoaded, results, result, categories, category} = this.state;

        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {

            return (
                <div>
                    <CategorySelector categories={categories} loadResults={(category) => this.loadResults(category)} selected={category}/>
                    <ResultsSelector results={results} setSelectedResult={(result) => this.setState({result: result})} selected={result}/>
                    <ResultsTable result={result}/>
                    <ResultsEditor loadResults={(category, result) => this.loadResults(category, result)} competition={competition} category={category}/>
                </div>
            );
        }
    }
}

export default ComponentWithNavigation(Results);
