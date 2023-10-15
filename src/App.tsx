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

interface HangmanState {
    word: string,
    guessedLetters: string[],
    incorrectLetter: number,
    isCompleted: boolean,
    msgDef: string,
}

interface HangmanProps {
}

class App extends Component<HangmanProps, HangmanState> {
  constructor(props: HangmanProps) {
    super(props);

    this.state = {
      word: generateRandomWord(),
      guessedLetters: [],
      incorrectLetter: 0,
      isCompleted: false,
      msgDef: "Refresh (press Enter) to try it again.",
    }

    this.keyboardHandler = this.keyboardHandler.bind(this);
  }

  keyboardHandler(e: KeyboardEvent) { 
    const key = e.key;

    e.preventDefault();

    if (key === 'Enter') this.resetGuessWord();

    if (!key.match(/^[a-z]$/)) return;

    this.addGuessLetter(key);
  }

  componentDidMount(): void {
    document.addEventListener('keypress', this.keyboardHandler);
  }

  componentWillUnmount(): void {
     document.removeEventListener('keypress', this.keyboardHandler);
  }

  componentDidUpdate(prevProps: HangmanState, prevState: HangmanState): void {
    if (prevState.guessedLetters !== this.state.guessedLetters)
    {
      this.getMsgResult();
    }
  }

  addGuessLetter = (letter:string) => { 
    if (this.state.guessedLetters.includes(letter) || this.state.isCompleted) return;

    const newGuessedLetters = [...this.state.guessedLetters, letter];
    
    this.setState({
      guessedLetters: newGuessedLetters,
      incorrectLetter: newGuessedLetters.filter((letter) => !this.state.word.includes(letter)).length
    })
  }

  getMsgResult() { 
    let isCompleted: boolean, msgDef: string;

    if (this.state.incorrectLetter >= MAX_TRY) {
      isCompleted = true;
      msgDef = "Nice Try! - Refresh (press Enter) to try it again."; // + this.state.incorrectLetter;
    }
    else if (this.state.word.split('').every(letter => this.state.guessedLetters.includes(letter))
      && this.state.guessedLetters.length > MIN_TRY) {
      isCompleted = true;
      msgDef = "Winner! - Refresh (press Enter) to try it again.";
    }
    else { 
      isCompleted = false;
      msgDef = "Refresh (press Enter) to try it again.";
    }

    this.setState({
      isCompleted: isCompleted,
      msgDef: msgDef
    })
  }

  // testing purpose
  resetGuessWord = () => {
    this.setState({
      word: generateRandomWord(),
      guessedLetters: [],
      incorrectLetter: 0,
      isCompleted: false,
      msgDef: "Refresh (press Enter) to try it again.",
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
        <button onClick={this.resetGuessWord}>REFRESH (Press Enter)</button>
        <HangmanResult
          msgDef={ this.state.msgDef }
        />
        <HangmanDrawing incorrectLetter={this.state.incorrectLetter} />
        <HangmanWord
          word={this.state.word}
          guessedLetters={this.state.guessedLetters}
          reveal={this.state.isCompleted}
        />
        <HangmanKeyboard
          isCompleted={ this.state.isCompleted}
          activeLetters={this.state.guessedLetters.filter(letter => this.state.word.includes(letter))}
          inactiveLetters={this.state.guessedLetters.filter(letter => !this.state.word.includes(letter))}
          addGuessedLetter={this.addGuessLetter}
        />
      </div>
    );
  }
}

export default App
