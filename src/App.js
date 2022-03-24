import './App.css';
import React from 'react'
import { nanoid } from 'nanoid'
// import Confetti from 'react-confetti'
import Die from './Die'

function App() {

    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    const [count, setCount] = React.useState(0)
    const [time, setTime] = React.useState(0)
    const [timerOn, setTimerOn] = React.useState(false)
    const [scores, setScores] = React.useState([])
    
    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
            setTimerOn(false)
        }
    }, [dice])

    React.useEffect(() => {
         let interval = null;
        if(timerOn) {
            interval = setInterval(() => {
               setTime(prevTime => prevTime + 10) 
            }, 10)
        } else {
            clearInterval(interval)
        }
        
        return () => clearInterval(interval)
        
    }, [timerOn])

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }
    
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }
    
    function rollDice() {
        if(!tenzies) {
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? 
                    die :
                    generateNewDie()
            }))
            setCount(oldCount => oldCount + 1)
            setTimerOn(true)
        } else {
            setTenzies(false)
            setDice(allNewDice())
            setCount(0)
            setTime(0)
        }
    }
    
    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? 
                {...die, isHeld: !die.isHeld} :
                die
        }))
        setTimerOn(true)
    }
    
    const diceElements = dice.map(die => (
        <Die 
            key={die.id} 
            value={die.value} 
            isHeld={die.isHeld} 
            holdDice={() => holdDice(die.id)}
        />
    ))
    
    function saveScore() {
        console.log("hi")
         const newScore = {
            rolls: count,
            time: time
        }
        setScores(prevScores => [newScore, ...prevScores])
        localStorage.setItem("scores", JSON.stringify([newScore, ...scores]))
        console.log(scores)
    }


    function getScores() {
      if (scores[0]) {
        let scoreBoard = JSON.parse(localStorage.getItem("scores")).map(score => (
        <div className="each-score">
             <h3>Rolls: {score.rolls} Time: {("0" + Math.floor((score.time / 60000) % 60)).slice(-2)}:{("0" + Math.floor((score.time / 1000) % 60)).slice(-2)}:{("0" + ((score.time / 10) % 100)).slice(-2)}</h3>
        </div>
        
       ))
       return scoreBoard
      } else {
        console.log("hi")
      }
    }
  return (
    <main>
            {/* {tenzies && <Confetti />} */}

            <span className="rolls">Rolls: {count}</span>

            <div className="time-container">
                <span className="time"> Time: </span>
                <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
                <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
                <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
             </div>

            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements}
            </div>
            <button 
                className="roll-dice" 
                onClick={rollDice}
            >
                {tenzies ? "New Game" : "Roll"}
            </button>

            {tenzies && <button onClick={saveScore} className="save-score">Save Score</button>}
           
            {tenzies && <h1>Saved Scores</h1>}
            {tenzies && getScores()}
        </main>
  );
}

export default App;
