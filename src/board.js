import React from 'react';

import {Square} from './squares';

export default class Board extends React.Component {

    getIndex(rowIndex, colIndex) {
        switch (rowIndex) {
          case 1:
            return colIndex - rowIndex;
          case 2:
            return rowIndex + colIndex;
          case 3:
            return rowIndex + colIndex + 2;
          default:
            return '';
        }
      }

    renderBoard() {
      return (
          [1, 2, 3].map((rowIndex) => {
            return (
            <div key={`board-row-${rowIndex}`}
                className="board-row">
                {this.renderColumns(rowIndex)}
            </div>
            );
        })
      );
    }

    getSquareStyle(col, row, index) {
        let isWinner = this.props.winners && this.props.winners.find((x) => {return x === index});
        return ((this.props.selectedAxis.x === col && this.props.selectedAxis.y === row) || isWinner) ? 
            'square-selected' : '';
    }

    renderColumns(rowIndex) {
        return (
            [1, 2, 3].map((colIndex) => {
                let index = this.getIndex(rowIndex, colIndex);
                return (
                    <Square 
                        key={`board-col-${index}`}
                        value={this.props.squares[index]}
                        style={this.getSquareStyle(colIndex, rowIndex, index)}
                        onClick={() => this.props.onClick({i: index, col: colIndex, row: rowIndex})}
                    />
                )
            })
        );
    }

    render() {
      return (
        <div>
            {this.renderBoard()}
        </div>
      );
    }
  }