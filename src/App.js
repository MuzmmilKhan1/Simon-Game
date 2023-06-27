import { useState, useEffect } from 'react'
import blueSound from './sounds/blue.mp3'
import greenSound from './sounds/green.mp3'
import redSound from './sounds/red.mp3'
import yellowSound from './sounds/yellow.mp3'
import wrongSound from './sounds/wrong.mp3'

function App() {

  // Classes to be toggled
  const [greenClass, setGreenClass] = useState('btn green') 
  const [blueClass, setBlueClass] = useState('btn blue') 
  const [redClass, setRedClass] = useState('btn red') 
  const [yellowClass, setYellowClass] = useState('btn yellow')
  const [bodyClass, setBodyClass] = useState('container')
  const [level, setLevel] = useState('Press A Key to Start')
  const [levelNum, setLevelNum] = useState(0);

  // Arrays
  const [randomArray, setRandomArray] = useState([]);
  const [generatedArray, setGeneratedArray] = useState([]);

  // Function for Generating a Random Number
  function randomNumber() {
      let Number = Math.floor(Math.random() * 4);
      setRandomArray(prevArray => [...prevArray, Number]);
      // Functions of Sounds
      let functions = [playGreen,playRed,playYellow,playBlue];
      // Play the sound of Random Number
      functions[Number]();
  }
  
  // Gets the Number from the User
  function userClicked(num) {
    console.log(num)
    // Get the User Clicked and Play its sound
    generatedArray.push(num)
    let functions = [playGreen,playRed,playYellow,playBlue];
    functions[num]();

    // If the current Value is not equal to the random Array's value
    if(generatedArray[generatedArray.length - 1] !== randomArray[generatedArray.length - 1]){

      playWrong();
      setLevelNum(0)
      setLevel("You Failed, Press A to start the Game")

      // Clear the Arrays
      setRandomArray([]);
      setGeneratedArray([]);
    }

    // If Users Array is anyway bigger than random array game is over
    if(generatedArray.length > randomArray.length){
        
        playWrong();
        setLevelNum(0)
        setLevel("You Failed, Press A to start the Game")

        // Clear the Array's
        setRandomArray([]);
        setGeneratedArray([]);
    }

    // Check Again if length of arrays is equal
    if(generatedArray.length === randomArray.length){

      console.log(randomArray)
      console.log(generatedArray)
      // If Check Returns True
      if(check()){
        setTimeout( ()=>{
          CheckWasTrue();
        }
          , 700);
      // If check is false than this input is wrong
      }else{
        playWrong();
        setLevelNum(0)
        setLevel("You Failed, Press A to start the Game")
      }
    }
  }
  
  // function check All the elements in the array
  function check() {
    for (let i = 0; i < randomArray.length; i++) {
      // Check If user has failed
      if (generatedArray[i] !== randomArray[i]) {
        setLevelNum(0)

        playWrong();
        // Empty Arrays
        setRandomArray([]);
        setGeneratedArray([]);
        return false;
      }
    }
    console.log("Check passed");
    return true;
  }
  
  function CheckWasTrue(){
    // Do all these Because Check returned true
    setGeneratedArray([]);
    let functions = [playGreen,playRed,playYellow,playBlue];
    let b = 0;
    for(let i=0;i<randomArray.length;i++){
      let n = randomArray[i];
      setTimeout(()=>
      {
        functions[n]()
      },b*500)
      b++;
    }
    setLevel("Level " + levelNum)
    setLevelNum(levelNum + 1);
    setTimeout(()=>randomNumber(),b*500)
  }

  // Start of Game
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'a' || event.key === 'A') {
        randomNumber();
        console.log("A pressed ")
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []); 


  // Sounds
  let blue = new Audio (blueSound)
  let green = new Audio (greenSound)
  let red = new Audio (redSound)
  let yellow = new Audio (yellowSound)
  let wrong = new Audio (wrongSound)

  // Sounds Functionality
  const playBlue = () => {
    blue.play();
    setBlueClass('btn pressed')
    setTimeout(function() {
      setBlueClass('btn blue')
    }, 300);
  }
  const playGreen = () => {
    green.play();
    setGreenClass('btn pressed')
    setTimeout(function() {
      setGreenClass('btn green')
    }, 300);
  }
  const playRed = () => {
    red.play();
    setRedClass('btn pressed')
    setTimeout(function() {
      setRedClass('btn red')
    }, 300);
  }
  const playYellow = () => {
    yellow.play();
    setYellowClass('btn pressed')
    setTimeout(function() {
      setYellowClass('btn yellow')
    }, 300);
  }
  const playWrong = () =>{
    wrong.play();
    setBodyClass('container game-over')
    setTimeout(function() {
      setBodyClass('container')
    }, 300);
  }


  return (
    <>
    <h1 id="level-title">{level}</h1>
  <div className={bodyClass}>
    <div lass="row">

      <div type="button" id="green" className={greenClass}
       onClick={()=>userClicked(0)}
       >

      </div>


      <div type="button" id="red" className={redClass} 
      onClick={()=>userClicked(1)}
      >

      </div>
    </div>

    <div className="row">

      <div type="button" id="yellow" className={yellowClass} 
      onClick={()=>userClicked(2)}
      >

      </div>
      <div type="button" id="blue" className={blueClass} 
      onClick={()=>userClicked(3)}
      >

      </div>

    </div>

  </div>
    </>
  );
}

export default App;
