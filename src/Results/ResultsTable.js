import React, { Component } from 'react';

import ReactTable from "react-table";
import "react-table/react-table.css";
import { withTranslation } from 'react-i18next';
import Translation from '../Common/Translation'

class ResultsTable extends Component {

    render() {
        if (!this.props.result) {
            return null;
        }

      const {t, category} = this.props;
      const columns = [
        {
          Header: t('Common.Participant'),
          accessor: "participant"
        },
        {
          Header: Translation.type(t, category),
          accessor: "result"
        }
      ];
        return (
            <div>
                <h2>{t('ResultsTable.Header')} {this.props.result.date}</h2>
                <ReactTable
                    data={this.props.result.results}
                    columns={columns}
                    defaultPageSize={5}
                    className="-striped -highlight"
                />
            </div>);
    }
}

export default withTranslation()(ResultsTable);
