import { Component } from "react";
import words from './resource/wordList.json'
import HangmanResult from './component/HangmanResult'
import HangmanDrawing from './component/HangmanDrawing'
import HangmanWord from './component/HangmanWord'
import HangmanKeyboard from './component/HangmanKeyboard'

type HangmanState = {
  guessWord: string;
  guessedWords: string[];
}

class App extends Component {
  state: HangmanState= {
      guessWord: this.genWord(),
      guessedWords: []
  };

  guessWord = () => {
    this.setState({
        guessWord: this.genWord(),
        guessedWords: [...this.state.guessedWords, this.state.guessWord]
    });

    console.log(this.state.guessWord, this.state.guessedWords);
  };

  genWord() { 
    return words[Math.floor(Math.random() * words.length)];
  }
  
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
        {/* <button onClick={this.guessWord}>TEST</button> */}
        <HangmanResult />
        <HangmanDrawing />
        <HangmanWord />
        <div style={{ alignSelf: 'stretch' }}>
            <HangmanKeyboard />
        </div>
      </div>
    );
  }
}

export default App
