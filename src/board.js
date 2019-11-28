import React from 'react';

import {Square} from './squares';

export default class Board extends React.Component {

    renderSquare(i, col, row) {
      return ( 
        <Square 
            value={this.props.squares[i]}
            onClick={() => this.props.onClick({i, col, row})}
        />
      );
    }

    getIndex(rowIndex, colIndex) {
        switch (rowIndex) {
          case 1:
            return colIndex - rowIndex;
          case 2:
            return rowIndex + colIndex;
          case 3:
            return rowIndex + colIndex + 2;
        }
      }

    renderBoard() {
      return (
          [1, 2, 3].map((rowIndex) => {
            let index1 = this.getIndex(rowIndex, 1);
            let index2 = this.getIndex(rowIndex, 2);
            let index3 = this.getIndex(rowIndex, 3);
            return (
            <div className="board-row">
                <Square 
                    value={this.props.squares[index1]}
                    style={this.getSquareStyle(1, rowIndex)}
                    onClick={() => this.props.onClick({i: index1, col: 1, row: rowIndex})}
                />
                <Square 
                    value={this.props.squares[index2]}
                    style={this.getSquareStyle(2, rowIndex)}
                    onClick={() => this.props.onClick({i: index2, col: 2, row: rowIndex})}
                />
                <Square 
                    value={this.props.squares[index3]}
                    style={this.getSquareStyle(3, rowIndex)}
                    onClick={() => this.props.onClick({i: index3, col: 3, row: rowIndex})}
                />
            </div>
            );
        })
      );
    }

    getSquareStyle(col, row) {
        return (this.props.selectedAxis.x == col && this.props.selectedAxis.y == row) ? 'square-selected' : '';
    }

    renderRows(rowIndex) {
      
      let index1 = this.getIndex(rowIndex, 1);
      let index2 = this.getIndex(rowIndex, 2);
      let index3 = this.getIndex(rowIndex, 3);
      return (
      <div className="board-row">
        <Square 
            value={this.props.squares[index1]}
            style={this.getSquareStyle(1, rowIndex)}
            onClick={() => this.props.onClick({i: index1, col: 1, row: rowIndex})}
        />
        <Square 
            value={this.props.squares[index2]}
            style={this.getSquareStyle(2, rowIndex)}
            onClick={() => this.props.onClick({i: index2, col: 2, row: rowIndex})}
        />
        <Square 
            value={this.props.squares[index3]}
            style={this.getSquareStyle(3, rowIndex)}
            onClick={() => this.props.onClick({i: index3, col: 3, row: rowIndex})}
        />
      </div>
      );
    }

    render() {
      console.log(this.props);
      return (
        <div>
            {this.renderBoard()}
        </div>
      );
    }
  }
  {/* <div className="board-row">
    {this.renderSquare(0, 1, 1)}
    {this.renderSquare(1, 2, 1)}
    {this.renderSquare(2, 3, 1)}
  </div>
  <div className="board-row">
    {this.renderSquare(3, 1, 2)}
    {this.renderSquare(4, 2, 2)}
    {this.renderSquare(5, 3, 2)}
  </div>
  <div className="board-row">
    {this.renderSquare(6, 1, 3)}
    {this.renderSquare(7, 2, 3)}
    {this.renderSquare(8, 3, 3)}
  </div> */}