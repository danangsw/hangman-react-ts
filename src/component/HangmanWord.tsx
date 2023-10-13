import { Component } from "react";

interface HangmanWordState { 
    word: string,
    guessedLetters: string[],
}

class HangmanWord extends Component<HangmanWordState>
{   
    render() { 
        return (<div style={{
            display: 'flex',
            gap: '.25em',
            fontSize: '6rem',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            fontFamily: 'monospace'
        }}>
            {this.props.word.split('').map((letter, index) => (
                <span style={{ borderBottom: '.1em solid black' }} key={`char-${index}`}>
                    <span style={{
                        visibility: this.props.guessedLetters.includes(letter) ?
                            'visible': 'hidden' }}>
                        {letter}
                    </span>
                </span>
            ))}
        </div>);
    }
}

export default HangmanWord;