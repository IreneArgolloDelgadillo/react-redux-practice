import React from 'react';

export class Square extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value: null, 
            clickNumber: 0
        };
    }

    bla(){
        let message = 'bla value is';// + this.state.value;
        alert(message);
    }
  //  onClick={function(){alert('click'); }}>

    render() {
      return (
        <button 
            className={`square ${this.props.style}`}
            onClick={() => this.props.onClick()}
        >
          {this.props.value}
        </button>
      );
    }
  }

  
  
export function SquareFunction(props) {
    return (
        <button className="square" onClick={props.onClick}>
          {props.value}
        </button>
      );
}

// export Square1;