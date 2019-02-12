import React, { Component } from 'react';

//Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

class CompetitionRanking extends Component {

    constructor(props) {
        super(props);
        this.columns = [
                        {
                            Header: "Position",
                            accessor: "position"
                        },
                        {
                            Header: "Participant",
                            accessor: "participant"
                        },
                        {
                            Header: "Points",
                            accessor: "points"
                        }
                    ];
    } 

    render() {
        if (!this.props.positions) {
            return null;
        }

        return (
            <div>
                <h2>Current ranking</h2>
                <ReactTable
                    data={this.props.positions}
                    columns={this.columns}
                    defaultPageSize={5}
                    className="-striped -highlight"
                />
            </div>);
    }
}

export default CompetitionRanking;
