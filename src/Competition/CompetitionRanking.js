import React, {Component} from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import { withTranslation } from 'react-i18next';

class CompetitionRanking extends Component {

    constructor(props) {
        super(props);
        const {t} = this.props;
        this.columns = [
            {
                Header: t("CompetitionRanking.Position"),
                accessor: "position"
            },
            {
                Header: t("CompetitionRanking.Participant"),
                accessor: "participant"
            },
            {
                Header: t("CompetitionRanking.Points"),
                accessor: "points"
            }
        ];
    }

    render() {
        const {t} = this.props;
        if (!this.props.positions) {
            return null;
        }

        return (
            <div>
                <h2>{t("CompetitionRanking.Header")}</h2>
                <ReactTable
                    data={this.props.positions}
                    columns={this.columns}
                    defaultPageSize={5}
                    className="-striped -highlight"
                />
            </div>);
    }
}

export default withTranslation()(CompetitionRanking);
