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
      clickNumbers: 0,
      isAscendentOrder: true,
      oderKey: 0,
      styleList: '',
      buttonLabel: 'Descentend'
    };
  }

  handleClick(squareObj) {
    const {i, col, row} = squareObj;
    const history = this.state.history;
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    let clickNumber = this.state.clickNumbers + 1;
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = clickNumber % 2 === 0 ? '🐑' : '👻';
    this.setState({
      history: history.concat([{
        squares: squares,
        selectedAxis: {x: col, y: row, index: i},
        order: history.length
      }]),
      clickNumbers: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      clickNumbers: step || 0,
      xIsNext: (step % 2) === 0,
    });
  }

  renderRecordsButton(currentBoardHistory){
    return currentBoardHistory.map((step, move) => {
      let {x, y} = step.selectedAxis;
      const desc = x && y ?
      `Go to move ${step.order}#. Axis (${x}, ${y})`:
      'Go to game start';
      return (
        <li key={`order-${step.order}`}>
          <button onClick={() => this.jumpTo(step.order)}>{desc}</button>
        </li>
      );
    })
  }

render() {
  const history = this.state.history.slice();
  const current = history[this.state.clickNumbers];
  const win = calculateWinner(current.squares);
  let status;
  if (win && win.winner) {
    status = 'Winner: ' + win.winner;
  } else if(win){
    status = 'Game has done.'
  } 
  else{
    status = 'Next player: ' + (this.state.xIsNext ? '👻' : '🐑' );
  }

  return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            selectedAxis={current.selectedAxis}
            winners={win ? win.squares : ""}
            onClick={(squareData) => this.handleClick(squareData)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <div>
            <h2>🐺 Game Play Record</h2>
            <button 
              onClick={() => {
                let [style, label] = !this.state.isAscendentOrder?['reversed', 'Ascendent'] : ['', 'Descentend']
                this.setState(
                {
                  isAscendentOrder: !this.state.isAscendentOrder,
                  styleList: style,
                  buttonLabel: label
                }
                )}}>
              {`Order ${this.state.isAscendentOrder? 'Descentend' : 'Ascendent'} `}
            </button>
          </div>
          <ol reversed={this.state.isAscendentOrder? '' : 'reversed'} key="record-panel" >
            {this.renderRecordsButton(!this.state.isAscendentOrder? history.reverse() : history)}
          </ol>
        </div>
      </div>
    );
  }

}
