# Tenzies - React Project
This is the final guided project of the Free React course on [Scrimba](https://scrimba.com/learn/learnreact). The design of the page was provided, however all code has been built from scratch. This project makes use of React components, and React hooks (useState and useEffect). It also uses the external react library, Nano ID.
# About the Project

https://user-images.githubusercontent.com/90280800/160474797-259876c4-3261-4efd-ab31-cfce5d68b320.mp4

This project is a dice clicking game and allows users to roll and hold dice until they have tenzies. It also includes a timer, counter, and lets users save their scores using local storage.

Live Site: https://subtle-dango-524816.netlify.app/
# Built with
- React.js
- HTML5
- CSS
- Flexbox
- Grid
# My Approach
The app is made up of 2 main components, 'App' and 10 'Die' components.

When app renders, the state called dice, runs allNewDice(), which returns an array of 10 objects. Each object containing a value (1-6), isHeld boolean, and id (nanoid).

From that dice state, I used diceElements to map out 10 unique Die Components to pass in props, which includes a holdDice() onClick function. This function toggles the Die's isHeld boolean, and conditionally changes the component's background color.

After the user selects their choice of dice, the rollDice() onClick function uses setDice() to update the state. It does this by using the .map() method to see which dice are held. If they are, then it is returned, if not, it runs generateNewDie() to return a new, unique die in the sequence.

The useEffect() in this project listens for the dice state. The function that runs checks if .every() die's isHeld boolean is true, and if they all contain the same value. Once the parameters are met, the function sets tenzies(state defaulted to false) to true. Then the app conditionally renders the 'New Game' button, 'Save Score' button, and maps out the scores held in local storage.
# Challenges

### Local Storage

The only hurdle I faced during this project is correctly displaying the scores from local storage. I realized that if their weren't any scores saved in local storage, it would result in an error. My solution to this was to have the scores be a function instead of an array, and have the function check if the 'scores' state contained a first score before parsing and mapping out the scores.

```
function getScores() {
      if (scores[0]) {
        let scoreBoard = JSON.parse(localStorage.getItem("scores")).map(score => (
        <div className="each-score">
             <h3>Rolls: {score.rolls} Time: {("0" + Math.floor((score.time / 60000) % 60)).slice(-2)}:{("0" + Math.floor((score.time / 1000) % 60)).slice(-2)}:{("0" + ((score.time / 10) % 100)).slice(-2)}</h3>
        </div> 
       ))
       return scoreBoard
      } 
    }
```
# Acknowledgments
- [nanoid](https://www.npmjs.com/package/nanoid)
