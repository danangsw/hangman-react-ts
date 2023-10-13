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
    incorrectLetter: number,
    isCompleted: boolean,
    msgDef: string,
  }

class App extends Component<HangmanProps> {
  state: HangmanProps;

  constructor(props: HangmanProps) {
    super(props);
    this.keyboardHandler = this.keyboardHandler.bind(this);
    this.state = {
      word: generateRandomWord(),
      guessedLetters: [],
      incorrectLetter: 0,
      isCompleted: false,
      msgDef: "Refresh to start new word."
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
    if (this.state.guessedLetters.includes(letter) || this.state.isCompleted) return;

    const newGuessedLetters = [...this.state.guessedLetters, letter];
    this.setState({
      guessedLetters: newGuessedLetters,
      incorrectLetter: newGuessedLetters.filter((letter) => !this.state.word.includes(letter)).length
    })

    this.getMsgResult();
  }

  getMsgResult() { 
      if (this.state.incorrectLetter >= MAX_TRY) { 
        this.setState({
          isCompleted: true,
          msgDef: "Nice Try! - Refresh to try it again." + this.state.incorrectLetter
        })

        return;
      }

      if (this.state.word.split('').every(letter => this.state.guessedLetters.includes(letter))
        && this.state.guessedLetters.length > MIN_TRY) {
        this.setState({
          isCompleted: true,
          msgDef: "Winner! - Refresh to try it again."
        })

        return;
      }

      this.setState({
        isCompleted: false
      })
      
      return;
  }

  // testing purpose
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
        {/* <button onClick={this.testGuessWord}>TEST {this.state.incorrectLetter}</button> */}
        <HangmanResult
          msgDef={ this.state.msgDef }
        />
        <HangmanDrawing incorrectLetter={this.state.incorrectLetter} />
        <HangmanWord word={this.state.word} guessedLetters={this.state.guessedLetters} />
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
