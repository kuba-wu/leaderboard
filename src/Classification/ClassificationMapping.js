import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';

class ClassificationMapping extends Component {

  constructor(props) {
    super(props);
    this.state = {
      mapping: props.mapping
    };
  }

  addPosition() {
    const mapping = this.state.mapping;
    mapping.positionToPoints.push(0);
    this.setState({ mapping: mapping });
    this.props.setMapping(mapping);
  }

  setPoints(index, event) {
    const mapping = this.state.mapping;
    mapping.positionToPoints[index] = event.target.value;
    this.setState({ mapping: mapping });
    this.props.setMapping(mapping);
  }

  render() {
    const {t} = this.props;

    if (!this.state.mapping) {
      return null;
    }

    const mapping = this.state.mapping.positionToPoints.map((points, index) =>
      <tr key={index + 1}>
        <td>{index + 1}</td>
        <td><input type="number" onChange={this.setPoints.bind(this, index)} value={points}/></td>
      </tr>);

    return (
      <div>
        <h2>{t('ClassificationMapping.Heading')}</h2>
        <table>
          <thead>
          <tr>
            <th>{t('Common.Position')}</th>
            <th>{t('Common.Points')}</th>
          </tr>
          </thead>
          <tbody>{mapping}</tbody>
        </table>
        <button type="button" onClick={this.addPosition.bind(this)}>{t('ClassificationMapping.AddButton')}</button>
      </div>);
  }
}

export default withTranslation()(ClassificationMapping);