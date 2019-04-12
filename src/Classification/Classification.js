import React, {Component} from 'react';
import ReactTags from 'react-tag-autocomplete';

import ComponentWithNavigation from '../Common/ComponentWithNavigation';
import Translation from '../Common/Translation';
import {withTranslation} from 'react-i18next';

import axios from 'axios';
import ClassificationMapping from "./ClassificationMapping";
import CompetitionRanking from "../Competition/CompetitionRanking";

class Classification extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            classification: null,
            allCategories: [],
            availableCategories: []
        };
    }

    componentDidMount() {
        this.loadClassification();
    }

    loadCategories() {
        const competition = this.props.match.params.competition;
        axios.get(`/api/v1/competition/${competition}/category`)
            .then((categoryList) => {
                    this.setState({
                      allCategories: categoryList.data
                    });
                    this.setAvailableCategories();
                }
            )
    }

    setAvailableCategories() {
      const type = this.state.classification.type;
      const used = this.state.classification.categories;
      const availableCategories = this.state.allCategories
        .filter(category => category.type === type)
        .filter(category => !used.some(usedCategory => usedCategory.id === category.id));
      this.setState({
        availableCategories: availableCategories
      });
    }

    loadClassification() {
        const competition = this.props.match.params.competition;
        const classification = this.props.match.params.classification;

        axios.get(`/api/v1/competition/${competition}/classification/${classification}`)
            .then((result) => {

                    this.setState({
                        classification: result.data,
                        isLoaded: true
                    });
                    this.loadCategories();
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    deleteCategory(index) {
      const classification = this.state.classification;
      classification.categories.splice(index, 1);
      this.setState({classification: classification});
      this.setAvailableCategories();
    }

    addCategory(category) {
      const classification = this.state.classification;
      classification.categories.push(category);
      this.setState({classification: classification});
      this.setAvailableCategories();
    }

    loadClassificationCallback = () => this.loadClassification();
    handleDelete = (index) => this.deleteCategory(index);
    handleAddition = (category) => this.addCategory(category);
    setMapping = (mapping) => {
      const classification = this.state.classification;
      classification.mapping = mapping;
      this.setState({classification: classification});
    };

    save() {
      const competition = this.props.match.params.competition;
      axios.put(`/api/v1/competition/${competition}/classification`, this.state.classification)
        .then((classification) => {
            this.setState({
              classification: classification.data
            });
          }
        )
    }

    render() {
        const {t} = this.props;
        const {error, isLoaded, classification} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {

            return (
                <div>
                    <div>
                        <span>{t('Classification.Type')}: {Translation.type(t, classification)}</span>
                    </div>
                    <div>
                        <span>{t('Classification.Categories')}: </span>
                        <ReactTags
                            tags={classification.categories}
                            suggestions={this.state.availableCategories}
                            handleDelete={this.handleDelete.bind(this)}
                            handleAddition={this.handleAddition.bind(this)}
                            placeholder={t('Classification.AddCategory')} />
                    </div>
                    <ClassificationMapping mapping={classification.mapping} setMapping={this.setMapping}/>
                    <button type="button" onClick={this.save.bind(this)}>{t('Classification.SaveButton')}</button>
                    <CompetitionRanking positions={classification.positions}/>
                </div>
            );
        }
    }
}

export default withTranslation()(ComponentWithNavigation(Classification));
