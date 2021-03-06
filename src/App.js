import React, { Component } from 'react'
import './App.css';

const calculate = array => {
  const operators = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => a / b,
  }
  let result;
  let currentOp;
  array.forEach(numOrOp => {
    if (!result) {
      result = numOrOp;
    }
    if (currentOp && typeof numOrOp === "number") {
      result = operators[currentOp](result, numOrOp);
    }
    if (typeof numOrOp === "string") {
      currentOp = numOrOp;
    }
  });
  return result;
};
const operatorCheck = check => {
  const operators = ["+", "-", "*", "/"];
  return operators.includes(check);
};
const decimalCheck = array => {
  let result = false;
  for (let i = 0; i < array.length; i++) {
    if (typeof array[i] === "string") {
      if (array[i].indexOf('.') > -1) {
        result = true;
        break
      }
    }
  }
  return result;
};
const NumPad = props => {
  const { func } = props;
  const numbers = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
  return numbers.map((num, i) => {
    return (
      <button
        id={num}
        className={`numbers-${i} ${num} pad-btn`}
        style={{ gridArea: num }}
        key={num}
        onClick={() => func(`${i}`)}>
        {i}
      </button>
    );
  });
};
export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ['0']
    };
  };
  inputNum = num => {
    const lastItem = this.state.input.slice(this.state.input.length - 1)[0];
    const beforeLastItem = this.state.input.slice(0, this.state.input.length - 1);
    const secondToLastItem = this.state.input.slice(this.state.input.length - 2)[0];
    const integer = (num * 1);
    let newInput = null;
    if (this.state.input[0] === '0' && integer === 0) return;
    if (this.state.input[0] === '0' && integer > 0) {
      newInput = [num];
    } else {
      if (operatorCheck(lastItem)) {
        newInput = [...this.state.input, num]
      }
      if (!operatorCheck(lastItem) || decimalCheck([lastItem]) || (operatorCheck(secondToLastItem) && lastItem === '-')) {
        newInput = [...beforeLastItem, [lastItem + num].join('')]
      }
    }
    this.setState({
      input: newInput
    });
  };
  inputOperator = operator => {
    const lastItem = this.state.input.slice(this.state.input.length - 1)[0];
    if (operator === "-" || operator !== lastItem) {
      this.setState({
        input: [...this.state.input, operator]
      });
    }
  };
  inputDecimal = decimal => {
    const lastItem = this.state.input.slice(this.state.input.length - 1);
    const beforeLastItem = this.state.input.slice(0, this.state.input.length - 1);
    if (!decimalCheck(lastItem) && (lastItem * 1) % 1 === 0) {
      this.setState({
        input: [...beforeLastItem, lastItem + decimal]
      });
    };
  };
  equate = () => {
    const formattedInput = this.state.input.map(str => {
      return operatorCheck(str) ? str : (str * 1);
    });
    const solution = `${calculate(formattedInput)}`;
    this.setState({
      input: [solution]
    });
  };
  clear = () => {
    this.setState({
      input: ['0']
    });
  };
  render() {
    return (
      <div className="App">
        <div
          id="display"
          className="display">
          {this.state.input}
        </div>
        <div className="pad">
          <NumPad func={this.inputNum} />
          <button className="decimal pad-btn" id="decimal" onClick={() => this.inputDecimal('.')}>.</button>
          <button className="equals pad-btn" id="equals" onClick={() => this.equate()}>=</button>
          <button className="clear pad-btn" id="clear" onClick={() => this.clear()}>CE</button>
          <button className="divide operators pad-btn" id="divide" onClick={() => this.inputOperator("/")}>&divide;</button>
          <button className="multiply operators pad-btn" id="multiply" onClick={() => this.inputOperator("*")}>&times;</button>
          <button className="subtract operators pad-btn" id="subtract" onClick={() => this.inputOperator("-")}>-</button>
          <button className="add operators pad-btn" id="add" onClick={() => this.inputOperator("+")}>+</button>
        </div>
      </div>
    )
  }
};

export default App;