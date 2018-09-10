import React from 'react';
import {Sunburst, Hint} from 'react-vis';

/**
 * Display a d3 Sunburst diagram
 *
 * @class D3Sunburst
 * @extends {React.Component}
 */

const tipStyle = {
  display: 'flex',
  color: '#fff',
  background: '#000',
  alignItems: 'center',
  padding: '5px'
};

const boxStyle = {height: '10px', width: '10px'};

export default class D3Sunburst extends React.Component {

  state = {
    hoveredCell: false
  };

  render () {
    const {hoveredCell} = this.state;
    return (
      <div style={{width: '250px'}}>
        <Sunburst
          style={{stroke: '#fff'}}
          margin={{top: 50, bottom: 50, left: 50, right: 50}}
          onValueMouseOver={v => this.setState({hoveredCell: (v.x && v.y) ? v : false})}
          onValueMouseOut={v => this.setState({hoveredCell: false})}
          data={this.props.simhashData}
          padAngle={() => 0.02}
          width={250}
          height={250}
          getSize={d => d.bigness}
          getColor={d => d.clr}>
          {hoveredCell ? <Hint value={this._buildValue(hoveredCell)}>
            <div style={tipStyle}>
              <div style={{...boxStyle, background: hoveredCell.clr}}/>
              {'Difference ' + hoveredCell.bigness}
              {' Timestamp ' + hoveredCell.name}
            </div>
          </ Hint> : null}
        </Sunburst>
      </div>
    );
  }

  _buildValue(hoveredCell) {
    const {radius, angle, angle0} = hoveredCell;
    const truedAngle = (angle + angle0) / 2;
    const temp = {
      x: radius * Math.cos(truedAngle),
      y: radius * Math.sin(truedAngle)
    };

    return temp;
  }

}
