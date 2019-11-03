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
}
export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: [0],
      output: 0,
    };
  }
  onChange = event => {
    this.setState({ input: event.target.value });
  }
  inputNum = num => {
    this.setState({
      input: [...this.state.input, num]
    });
  }
  inputOperator = operator => {
    this.setState({
      input: [...this.state.input, operator]
    });
  }
  equate = () => {
    this.setState({
      output: this.state.input
    });
  }
  clear = () => {
    this.setState({
      input: [0]
    });
  }
  createNumPad = func => {
    const numbers = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
    return numbers.map((num, i) => {
      return (
        <button
          id={num}
          className={`numbers-${i} ${num} pad-btn`}
          style={{ gridArea: num }}
          key={num}
          onClick={() => func(i)}>
          {i}
        </button>
      );
    })
  }
  render() {
    return (
      <div className="App">
        <div
          id="display"
          className="display">
          {this.state.input}
        </div>
        {console.log(this.state.input)}
        {/* <input
          id="display"
          className="display"
          type="text"
          value={this.state.output}
          onChange={() => this.onChange}
        /> */}
        <div className="pad">
          {this.createNumPad(this.inputNum)}
          <button className="decimal pad-btn" id="decimal">.</button>
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
}

export default App