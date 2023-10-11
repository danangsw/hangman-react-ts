import { useState } from "react";
import words from './resource/wordList.json'
import HangmanResult from './component/HangmanResult'
import HangmanDrawing from './component/HangmanDrawing'
import HangmanWord from './component/HangmanWord'
import HangmanKeyboard  from './component/HangmanKeyboard'

function App() { 
  const [guessWord, setGuessWord] = useState<string>(() => { 
    return words[Math.floor(Math.random() * words.length)];
  });
  const [guessedWords, setGuessedWord] = useState<string[]>([]);

  // Temporary, discard later
  () => { 
    setGuessWord(guessWord);
    setGuessedWord(guessedWords);
  }
  
  return (
    <div
      style={{
        maxWidth: '800px',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        margin: '0 auto',
        alignItems: 'center',
      }}>
      <HangmanResult />
      <HangmanDrawing />
      <HangmanWord />
      <HangmanKeyboard />
    </div>
  )
}

export default App
