import { Component } from "react";
import '../style/HangmanKeyboard.css'

const KEYS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

type HangmanKeyboardProps = {
    isCompleted: boolean,
    activeLetters: string[],
    inactiveLetters: string[],
    addGuessedLetter: (letter:string) => void
}

class HangmanKeyboard extends Component<HangmanKeyboardProps>
{
    constructor(props: HangmanKeyboardProps) {
        super(props);
    }
    
    render() { 
        return (
        <div style={{ alignSelf: 'stretch' }}>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(75px, 1fr))',
                gap: '.5rem',
            }}>
                {KEYS.map(key => {
                    const isActive = this.props.activeLetters.includes(key)
                    const isInActive = this.props.inactiveLetters.includes(key)
                    return (
                        <button
                            onClick={() => this.props.addGuessedLetter(key)}
                            className={`btn ${isActive && 'active'} ${isInActive && 'inactive'}`} key={`key-${key}`}
                            disabled={ isActive || isInActive || this.props.isCompleted}
                        >{key}</button>
                    )
                })}
            </div>
        </div>);
    }
}

export default HangmanKeyboard;