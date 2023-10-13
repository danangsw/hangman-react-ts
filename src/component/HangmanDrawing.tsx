import { Component } from "react";

const HEAD = (
    <div style={{
        width: '50px',
        height: '50px',
        borderRadius: '100%',
        border: '10px solid black',
        position: 'absolute',
        top: '50px',
        right: '-30px'
    }}/>
)

const BODY = (
    <div style={{
        width: '10px',
        height: '110px',
        background: 'black',
        position: 'absolute',
        top: '115px',
        right: 0
    }}/>
)

const R_ARM = (
    <div style={{
        width: '100px',
        height: '10px',
        background: 'black',
        position: 'absolute',
        top: '150px',
        right: '-100px',
        rotate: '-30deg',
        transformOrigin: 'left bottom'
    }}/>
)

const L_ARM = (
     <div style={{
        width: '100px',
        height: '10px',
        background: 'black',
        position: 'absolute',
        top: '150px',
        right: '10px',
        rotate: '30deg',
        transformOrigin: 'right bottom'
    }}/>
)

const R_LEG = (
    <div style={{
        width: '120px',
        height: '10px',
        background: 'black',
        position: 'absolute',
        top: '210px',
        right: '-110px',
        rotate: '60deg',
        transformOrigin: 'left bottom'
    }}/>
)

const L_LEG = (
     <div style={{
        width: '120px',
        height: '10px',
        background: 'black',
        position: 'absolute',
        top: '210px',
        right: '0px',
        rotate: '-60deg',
        transformOrigin: 'right bottom'
    }}/>
)

const BODY_PARTS = [HEAD, BODY, R_ARM, L_ARM, R_LEG, L_LEG];

interface HangmanDrawingState { 
    incorrectLetter: number
}

class HangmanDrawing extends Component <HangmanDrawingState>
{
    render() { 
        return (<div style={{ position: 'relative' }}>
            {
                BODY_PARTS.filter((_, i) => i < (this.props.incorrectLetter))
            }
            <div style={{ height: '50px', width: '10px', background: 'black', position: 'absolute', top: 0, right: 0}} />
            <div style={{ height: '10px', width: '200px', background: 'black', marginLeft: '120px'}} />
            <div style={{ height: '400px', width: '10px', background: 'black', marginLeft: '120px'}} />
            <div style={{ height: '10px', width: '250px', background: 'black' }} />
            <div style={{position: 'absolute', marginLeft: '120px'}}>{ this.props.incorrectLetter}</div>
        </div>);
    }
}

export default HangmanDrawing;