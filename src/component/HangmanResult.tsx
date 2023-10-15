import { Component } from "react";
interface HangmanResultProps { 
    msgDef: string
}

class HangmanResult extends Component<HangmanResultProps>
{
    constructor(props: HangmanResultProps) {
        super(props);
    }

    render() { 
        return (
            <div style={{ fontSize: '2em', textAlign: 'center' }}>
                {
                    this.props.msgDef
                }
            </div>
        )
    }
}

export default HangmanResult;