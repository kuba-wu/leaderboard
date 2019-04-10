import React, {useState, useEffect} from "react";
import axios from 'axios';
import {useTranslation} from 'react-i18next';

const CompetitionsList = () => {

    const [error, setError] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);
    const [competitions, setCompetitions] = useState([]);
    const [competition, setCompetition] = useState('');

    const loadCompetitions = () => {
        axios.get("/api/v1/competition")
            .then(
                (result) => {
                    setIsLoaded(true);
                    setCompetitions(result.data);
                    setCompetition("");
                }).catch(error => {
            setIsLoaded(true);
            setError(error);
        });
    };

    useEffect(() => {
        loadCompetitions();
    }, []);

    const saveNewCompetition = (event) => {
        axios.post("/api/v1/competition", {name: competition}).then(() => loadCompetitions());
    };

    const handleCompetitionInput = (event) => {
        const value = event.target.value;
        setCompetition(value);
    };

    const removeCompetition = (competitionName) => {
        axios.delete("/api/v1/competition/" + competitionName).then(() => loadCompetitions());
    };


    const {t} = useTranslation();

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div>
                <span>{t("CompetitionsList.select")}</span>
                <input type="text" onChange={handleCompetitionInput} value={competition}/>
                <button type="button" onClick={saveNewCompetition}>{t('CompetitionsList.add')}</button>

                <ul>
                    {competitions.map(competition => (
                        <li key={competition.name}>
                            <a href={"/competition/" + competition.name}>{competition.name}</a>
                            <button type="button" onClick={() => removeCompetition(competition.name)}>{t("CompetitionsList.remove")}</button>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
};

export default CompetitionsList;
