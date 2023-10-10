import { useState } from "react";
import words from './resource/wordList.json'
import RandomWord from './component/RandomWord'

function generateRandomWord() { 
  return words[Math.floor(Math.random() * words.length)];
}

function App() { 
  const [randomWord, setRandomWord] = useState<string>('');

  const handleClick = () => { 
    setRandomWord(generateRandomWord());
  }

  const handleClick2 = () => { 
    setRandomWord((prevWord ) => prevWord +' '+ generateRandomWord());
  }
  
  return (
    <>
      <div>
        <h1>Sugeng rawuh!!!</h1>
        <h2>{randomWord}</h2>
        <button onClick={handleClick}>Random Words</button>
        <button onClick={handleClick2}>Random Words++</button>
      </div>
      <RandomWord />
    </>
  )
}

export default App
