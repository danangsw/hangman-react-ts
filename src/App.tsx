import { Component } from "react";
import words from './resource/wordList.json'
import HangmanResult from './component/HangmanResult'
import HangmanDrawing from './component/HangmanDrawing'
import HangmanWord from './component/HangmanWord'
import HangmanKeyboard from './component/HangmanKeyboard'

const MAX_TRY = 6
const MIN_TRY = 0

const generateRandomWord = () => { 
  return words[Math.floor(Math.random() * words.length)];
}

type HangmanProps = {
    word: string,
    guessedLetters: string[],
    incorrectLetter: number
  }

class App extends Component<HangmanProps> {
  state: HangmanProps;
  isCompleted: boolean;
  msgDef: string;

  constructor(props: HangmanProps) {
    super(props);
    this.keyboardHandler = this.keyboardHandler.bind(this);
    this.state = {
      word: generateRandomWord(),
      guessedLetters: [],
      incorrectLetter: 0
    };
    this.isCompleted = false;
    this.msgDef = "Refresh to try it again."
  }

  keyboardHandler(e: KeyboardEvent) { 
    const key = e.key;

    e.preventDefault();

    if (!key.match(/^[a-z]$/)) return

    this.addGuessLetter(key);
  }

  componentDidMount(): void {
    document.addEventListener('keypress', this.keyboardHandler);
  }

  componentWillUnmount(): void {
     document.removeEventListener('keypress', this.keyboardHandler);
  }

  addGuessLetter = (letter:string) => { 
    if (this.state.guessedLetters.includes(letter) || this.isCompleted) return;

    const newGuessedLetters = [...this.state.guessedLetters, letter];
    this.getMsgResult();
    
    this.setState({
      guessedLetters: newGuessedLetters,
      incorrectLetter: newGuessedLetters.filter((letter) => !this.state.word.includes(letter)).length
    })
  }

  getMsgResult() { 
      if (this.state.incorrectLetter >= MAX_TRY) { 
        this.isCompleted = true;
        this.msgDef = "Nice Try! - Refresh to try it again."; // + this.state.incorrectLetter;

        return;
      }

      if (this.state.word.split('').every(letter => this.state.guessedLetters.includes(letter))
        && this.state.guessedLetters.length > MIN_TRY) {
        this.isCompleted=true;
        this.msgDef= "Winner! - Refresh to try it again.";

        return;
      }

      this.isCompleted=false
      return;
  }

  // testing purpose
  resetGuessWord = () => {
    const newWord = generateRandomWord();
    // const guessWordTest = newWord.split('').filter((_, i) => i % 2 !== 0);
    // const countIncorrect = newWord.split('').filter((e) => !guessWordTest.includes(e)).length
    this.setState({
        word: newWord,
        guessedLetters: [], 
        incorrectLetter: 0
    });

    this.isCompleted = false;
    this.msgDef = "Refresh to try it again."
  };
  
  render() {
    this.getMsgResult();

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
        <button onClick={this.resetGuessWord}>REFRESH</button>
        <HangmanResult
          msgDef={ this.msgDef }
        />
        <HangmanDrawing incorrectLetter={this.state.incorrectLetter} />
        <HangmanWord
          word={this.state.word}
          guessedLetters={this.state.guessedLetters}
          reveal={this.isCompleted}
        />
        <HangmanKeyboard
          isCompleted={ this.isCompleted}
          activeLetters={this.state.guessedLetters.filter(letter => this.state.word.includes(letter))}
          inactiveLetters={this.state.guessedLetters.filter(letter => !this.state.word.includes(letter))}
          addGuessedLetter={this.addGuessLetter}
        />
      </div>
    );
  }
}

export default App
