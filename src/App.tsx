import { Component } from "react";
import words from './resource/wordList.json'
import HangmanResult from './component/HangmanResult'
import HangmanDrawing from './component/HangmanDrawing'
import HangmanWord from './component/HangmanWord'
import HangmanKeyboard from './component/HangmanKeyboard'

const generateRandomWord = () => { 
  return words[Math.floor(Math.random() * words.length)];
}

class App extends Component {
  state = {
      word: generateRandomWord(),
      guessedLetters: [],
      incorrectLetter: 0
  };

  testGuessWord = () => {
    const newWord = generateRandomWord();
    const guessWordTest = newWord.split('').filter((_, i) => i % 2 === 0);
    const countIncorrect = newWord.split('').filter((e) => !guessWordTest.includes(e)).length
    this.setState({
        word: newWord,
      // testing purpose
        guessedLetters: guessWordTest, 
        incorrectLetter: countIncorrect
    });
  };
  
  render() {
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
        <button onClick={this.testGuessWord}>TEST {this.state.incorrectLetter}</button>
        <HangmanResult />
        <HangmanDrawing />
        <HangmanWord word={this.state.word} guessedLetters={this.state.guessedLetters} />
        <div style={{ alignSelf: 'stretch' }}>
            <HangmanKeyboard />
        </div>
      </div>
    );
  }
}

export default App
