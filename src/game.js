import React from 'react';
import Board from './board';

import {calculateWinner} from './winnerCalculator';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        selectedAxis: {x: null, y: null}
      }],
      xIsNext: true,
      clickNumbers: 0
    };
  }

  handleClick(squareObj) {
    const {i, col, row} = squareObj;
    const history = this.state.history;
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    let clickNumber = this.state.clickNumbers + 1;
    //console.log(squaresi, col, row);
    //squares[i].style = 'square-selected';
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = clickNumber % 2 === 0 ? 'O' : 'X';
      this.setState({
        history: history.concat([{
          squares: squares,
          selectedAxis: {x: col, y: row}
        }]),
        clickNumbers: history.length,
        xIsNext: !this.state.xIsNext
      });
  }

  jumpTo(step) {
    this.setState({
      clickNumbers: step,
      xIsNext: (step % 2) === 0,
    });
  }

  renderMoveElement(history) {
    return ( history.map((step, move) => {
      let {selectedAxis} = step
      const desc = move ?
        `Go to move ${move}#. Axis (${selectedAxis.x}, ${selectedAxis.y})`:
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    })
    )
  }

  render() {
  const history = this.state.history;
  const current = history[this.state.clickNumbers];
  const winner = calculateWinner(current.squares);

  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
  }

  return (
        <div className="game">
          <div className="game-board">
            <Board 
              squares={current.squares}
              selectedAxis={current.selectedAxis}
              onClick={(squareData) => this.handleClick(squareData)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{this.renderMoveElement(history)}</ol>
          </div>
        </div>
      );
  }


}
