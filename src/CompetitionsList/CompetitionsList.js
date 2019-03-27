import React, {Component} from 'react';
import axios from 'axios';

class CompetitionsList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            competitions: [],
            competition: ""
        };
    }

    loadCompetitions() {
        axios.get("/api/v1/competition")
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        competitions: result.data,
                        competition: ""
                    });
                }).catch(error => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        );
    }

    componentDidMount() {
        this.loadCompetitions();
    }

    saveNewCompetition(event) {

        axios.post("/api/v1/competition", {name: this.state.competition}).then(() => this.loadCompetitions());
    }

    setCompetition(event) {
        const value = event.target.value;
        this.setState({competition: value});
    }

    removeCompetition(competitionName) {
        axios.delete("/api/v1/competition/"+competitionName).then(() => this.loadCompetitions());
    }

    render() {
        const {error, isLoaded, competitions, competition} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div>
                    <span>Select competition</span>
                    <span> or </span>


                    <input type="text" onChange={this.setCompetition.bind(this)} value={competition}/>
                    <button type="button" onClick={this.saveNewCompetition.bind(this)}>Add new</button>

                    <ul>
                        {competitions.map(competition => (
                            <li key={competition.name}>
                                <a href={"/competition/" + competition.name}>{competition.name}</a>
                                <button type="button" onClick={this.removeCompetition.bind(this, competition.name)}>Remove</button>
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }
    }
}

export default CompetitionsList;
