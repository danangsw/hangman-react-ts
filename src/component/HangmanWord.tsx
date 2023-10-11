import { Component } from "react";

class HangmanWord extends Component
{
    render() { 
        const words = 'testing';
        return (<div style={{
            display: 'flex',
            gap: '.25em',
            fontSize: '6rem',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            fontFamily: 'monospace'
        }}>
            {words.split('').map((letter) => (
                <span style={{ borderBottom: '.1em solid black' }}>
                    <span style={{ visibility: 'hidden' }}>
                        {letter}
                    </span>
                </span>
            ))}
        </div>);
    }
}

export default HangmanWord;