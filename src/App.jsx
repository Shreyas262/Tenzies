import { useState, useEffect, useRef } from 'react'
import Die from './components/die.jsx'

export default function App() {

  function generateAllNewDice() {
    return new Array(10).fill().map(() => Math.ceil(Math.random() * 6))
  }

  const [dice, setDice] = useState(generateAllNewDice())

  return (
    <main style={{ backgroundColor: 'White'}}>
      <div className="title-container">
        <h1>Tenzies</h1>
        <p>Roll until all dice are the same.<br />
          Click each die to freeze it at its current value<br />
          between rolls.</p>
      </div>
      <div className="die-container">
        <Die value={1} />
        <Die value={1} />
        <Die value={1} />
        <Die value={1} />
        <Die value={1} />
        <Die value={1} />
        <Die value={1} />
        <Die value={1} />
        <Die value={1} />
        <Die value={1} />
      </div>
      <button className="roll-btn">Roll</button>
    </main>
  )
}

