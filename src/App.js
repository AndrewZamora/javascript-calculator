import React from 'react';
import './App.css';
const numbers = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
const numButtons = numbers.map((num, i) => {
  return (
    <button id={num} className={`numbers-${i} ${num} pad-btn`} style={{gridArea:num}} key={num}>{i}</button>
  );
});

function App() {
  return (
    <div className="App">
      <div id="display" className="display">
      </div>
      <div className="pad">
        {numButtons}
        <button className="decimal pad-btn" id="decimal" >.</button>
        <button className="equals pad-btn" id="equals" >=</button>
        <button className="clear pad-btn" id="clear" >CE</button>
        <button className="divide operators pad-btn" id="divide">&divide;</button>
        <button className="multiply operators pad-btn" id="multiply">&times;</button>
        <button className="subtract operators pad-btn" id="subtract">-</button>
        <button className="add operators pad-btn" id="add">+</button>
      </div>
    </div>
  );
}

export default App;
