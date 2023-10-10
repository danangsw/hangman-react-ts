import { Component } from "react";
import words from '../resource/wordList.json';

type WordState = {
  word: string;
};

class RandomWord extends Component { 
    state: WordState = {
        word: '',
    };

    handleClick = () => {
        this.setState({
            word: this.genWord()
        });
    };

    genWord() {
        return words[Math.floor(Math.random() * words.length)];
    }

    render() {
        return (
        <div>
            <h3>{ this.state.word}</h3>
            <button onClick={this.handleClick}>Random Words (Class)</button>
        </div>
    );
  }
}

export default RandomWord;  