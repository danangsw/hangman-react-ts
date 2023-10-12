import { Component } from "react";

class HangmanWord extends Component
{
    words = 'test';
    guessedLetters = ['e', 't', 'x'];
    incorrectLetters = this.guessedLetters.filter(
        letter => !this.words.includes(letter)
    )
    
    render() { 
        return (<div style={{
            display: 'flex',
            gap: '.25em',
            fontSize: '6rem',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            fontFamily: 'monospace'
        }}>
            {this.words.split('').map((letter, index) => (
                <span style={{ borderBottom: '.1em solid black' }} key={`char-${index}`}>
                    <span style={{
                        visibility: this.guessedLetters.includes(letter) ?
                            'visible': 'hidden' }}>
                        {letter}
                    </span>
                </span>
            ))}
        </div>);
    }
}

export default HangmanWord;