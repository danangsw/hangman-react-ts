import { Component } from "react";
import words from './resource/wordList.json'
import HangmanResult from './component/HangmanResult'
import HangmanDrawing from './component/HangmanDrawing'
import HangmanWord from './component/HangmanWord'
import HangmanKeyboard from './component/HangmanKeyboard'

const generateRandomWord = () => { 
  return words[Math.floor(Math.random() * words.length)];
}

type HangmanState = {
      word: string,
      guessedLetters: string[],
      incorrectLetter: number
  }

class App extends Component<HangmanState> {
  state: HangmanState;

  constructor(props: HangmanState) {
    super(props);
    this.keyboardHandler = this.keyboardHandler.bind(this);
    this.state = {
      word: generateRandomWord(),
      guessedLetters: [],
      incorrectLetter: 0
    };
  }

  keyboardHandler(e: KeyboardEvent) { 
      const key = e.key;

      if (!key.match(/^[a-z]$/)) return

      e.preventDefault();

      this.addGuessLetter(key);
  }

  componentDidMount(): void {
    document.addEventListener('keypress', this.keyboardHandler);
  }

  componentWillUnmount(): void {
     document.removeEventListener('keypress', this.keyboardHandler);
  }

  addGuessLetter = (letter:string) => { 
    if (this.state.guessedLetters.includes(letter)) return;
    
    const newGuessedLetters = [...this.state.guessedLetters, letter];
    this.setState({
      guessedLetters: newGuessedLetters,
      incorrectLetter: newGuessedLetters.filter((letter) => !this.state.word.includes(letter)).length
    })
  }

  testGuessWord = () => {
    const newWord = generateRandomWord();
    const guessWordTest = newWord.split('').filter((_, i) => i % 2 !== 0);
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
        <HangmanDrawing incorrectLetter={this.state.incorrectLetter} />
        <HangmanWord word={this.state.word} guessedLetters={this.state.guessedLetters} />
        <HangmanKeyboard />
      </div>
    );
  }
}

export default App
