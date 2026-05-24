import { useState, useEffect, useRef } from 'react'
import Die from './components/die.jsx'
import { nanoid } from 'nanoid'
import './assets/css/App.css'
import Confetti from 'react-confetti'

export default function App() {

  const rollBtnRef = useRef(null)
  //generate all new dice numbers
  function generateAllNewDice() {
    return new Array(10).fill(0).map(() => (
      {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        isRolling: false,
        id: nanoid()
      })
    )
  }
  const [diceNums, setDiceNums] = useState(() => generateAllNewDice())

  const gameWon = diceNums.every(die => die.isHeld) && diceNums.every(die => die.value === diceNums[0].value)
  
    useEffect(() => {
      if (gameWon) {
        rollBtnRef.current.focus()
      }
    }, [gameWon])

  //check if a dice is held or not
  function holdDice(id) {
    setDiceNums(prevDice => prevDice.map(die =>
      die.id === id ?
        { ...die, isHeld: !die.isHeld } :
        die
    ))
  }

  //function to roll dice after clicking roll button
  function rollDice() {

    if (!gameWon) {
    // Starting roll animation
    setDiceNums(prevDice =>
      prevDice.map(die =>
        die.isHeld
          ? die
          : { ...die, isRolling: true }
      )
    )

    // Changing values after animation delay
    setTimeout(() => {
      setDiceNums(prevDice =>
        prevDice.map(die =>
          die.isHeld
            ? die
            : {
                ...die,
                value: Math.ceil(Math.random() * 6),
                isRolling: false
              }
        )
      )
    }, 500)}
    
    else{
      setDiceNums(generateAllNewDice())
    }
  }
  
  //Every single die componet 
  const diceElements = diceNums.map(dieObj =>
    <Die
      key={dieObj.id}
      value={dieObj.value}
      isHeld={dieObj.isHeld}
      isRolling={dieObj.isRolling}
      onClick={() => holdDice(dieObj.id)}
      id={dieObj.id}
    />
  )

  return (
    <main style={{ backgroundColor: 'White' }}>
      {gameWon && <Confetti style={{width: '100%', height: '100%'}} />}
      <div aria-live="polite" className="visually-hidden">
        {gameWon && <p>Congratulations! You won!</p>}
      </div>
      <div className="title-container">
        <h1>Tenzies</h1>
        <p>Roll until all dice are the same.<br />
          Click each die to freeze it at its current value<br />
          between rolls.</p>
      </div>
      
      <div className="die-container">
        {diceElements}
      </div>

      <button className="roll-btn" onClick={rollDice} ref={rollBtnRef}>{gameWon ? "New Game" : "Roll"}</button>
    </main>
    )
}

