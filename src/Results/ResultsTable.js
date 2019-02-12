import React, { Component } from 'react';

import ReactTable from "react-table";
import "react-table/react-table.css";

class ResultsTable extends Component {

    constructor(props) {
        super(props);
        this.columns = [
            {
                Header: "Participant",
                accessor: "participant"
            },
            {
                Header: "Result",
                accessor: "result"
            }
        ];
    }

    render() {
        if (!this.props.result) {
            return null;
        }

        return (
            <div>
                <h2>Results from {this.props.result.date}</h2>
                <ReactTable
                    data={this.props.result.results}
                    columns={this.columns}
                    defaultPageSize={5}
                    className="-striped -highlight"
                />
            </div>);
    }
}

export default ResultsTable;
