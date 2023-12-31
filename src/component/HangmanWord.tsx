import { Component } from "react";

interface HangmanWordProps { 
    word: string,
    guessedLetters: string[],
    reveal: boolean
}

class HangmanWord extends Component<HangmanWordProps>
{   
    constructor(props: HangmanWordProps) {
        super(props);
    }

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
                        visibility: this.props.guessedLetters.includes(letter) || this.props.reveal ?
                            'visible' : 'hidden',
                        color: !this.props.guessedLetters.includes(letter) && this.props.reveal ? 'red' : 'black'}}>
                        {letter}
                    </span>
                </span>
            ))}
        </div>);
    }
}

export default HangmanWord;