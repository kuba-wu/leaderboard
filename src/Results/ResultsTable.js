import React, { Component } from 'react';

import ReactTable from "react-table";
import "react-table/react-table.css";
import { withTranslation } from 'react-i18next';


class ResultsTable extends Component {

    constructor(props) {
        super(props);
        const {t} = this.props;
        this.columns = [
            {
                Header: t('ResultsTable.Participant'),
                accessor: "participant"
            },
            {
                Header: t('ResultsTable.Result'),
                accessor: "result"
            }
        ];
    }

    render() {
        if (!this.props.result) {
            return null;
        }

        const {t} = this.props;
        return (
            <div>
                <h2>{t('ResultsTable.Header')} {this.props.result.date}</h2>
                <ReactTable
                    data={this.props.result.results}
                    columns={this.columns}
                    defaultPageSize={5}
                    className="-striped -highlight"
                />
            </div>);
    }
}

export default withTranslation()(ResultsTable);
