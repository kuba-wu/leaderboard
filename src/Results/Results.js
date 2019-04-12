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
                category: (categories.firstOrNull())
            });
            if (this.state.category) {
                this.loadResults(this.state.category.id);
            }

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
        const selectedCategory = this.state.categories.find(category => (categoryId === category.id));

        axios.get(`/api/v1/competition/${competition}/category/${selectedCategory.name}/results`).then(res => {
            const results = res.data.sort((first, second) => first.date.localeCompare(second.date));
            this.setState({
                isLoaded: true,
                results: results,
                category: selectedCategory
            });

            const selectedResult = (preselectedResult ? preselectedResult : results.firstOrNull());
            this.setResultSorted(selectedResult);

        }).catch(error => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        );
    }

    setResultSorted(result) {
        if (result) {
          const results = result.results.sort((first, second) => (first.result.localeCompare(second.result)));
          result.results = results;
        }
        this.setState({result: result});
    }

    selectResult(resultId) {
        const result = this.state.results.find(single => single.id === resultId);
        this.setResultSorted(result);
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
                    <CategorySelector categories={categories} loadResults={(categoryId) => this.loadResults(categoryId)} selected={category}/>
                    <ResultsSelector results={results} setSelectedResult={(result) => this.selectResult(result)} selected={result}/>
                    <ResultsTable category={category} result={result}/>
                    <ResultsEditor loadResults={(category, result) => this.loadResults(category, result)} competition={competition} category={category}/>
                </div>
            );
        }
    }
}

export default ComponentWithNavigation(Results);
