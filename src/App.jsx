import { useState, useEffect, useRef } from 'react'
import Die from './components/die.jsx'
import {nanoid} from 'nanoid'

export default function App() {

  function generateAllNewDice() {
    return new Array(10).fill(0).map(() =>(
      {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
      })
     )
  }

  const [diceNums, setDiceNums] = useState(generateAllNewDice())

  function holdDice(id) {
    setDiceNums(prevDice => prevDice.map(die => {
      if (die.id === id) {
        return {...die, isHeld: !die.isHeld}
      }
      return die
    }))
  }

  const diceElements = diceNums.map(dieObj =>
    <Die
      key={dieObj.id}
      value={dieObj.value}
      isHeld={dieObj.isHeld}
      onClick={() => holdDice(dieObj.id)}
      id={ dieObj.id }
    />
  )

  function rollDice() {
    setDiceNums(generateAllNewDice())
  }

  return (
    <main style={{ backgroundColor: 'White'}}>
      
      <div className="title-container">
        <h1>Tenzies</h1>
        <p>Roll until all dice are the same.<br />
          Click each die to freeze it at its current value<br />
          between rolls.</p>
      </div>
      
      <div className="die-container">
        {diceElements}
      </div>

      <button className="roll-btn" onClick={rollDice}>Roll</button>
    </main>
  )
}

