import React from 'react'
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { Board } from '../Board/Board'

interface GameState {
    xIsNext: boolean;
    lines:number[][];
    stepNumber: number;
    history: Array<Array<String>>;
}

interface GameProps {
    sizeField: number;
}

export class Game extends React.Component<GameProps, GameState> {
    
    constructor(props: GameProps) {
        super(props);

        //Calculate winner items
        var tmplines:number[][] = [];

        for(let i = 0; i < props.sizeField; i++) {
            tmplines[i] = Array(props.sizeField )
            for(let j = 0; j < props.sizeField; j++) {
                tmplines[i][j] = i * props.sizeField + j
            }
        }        
        const winnerLines:any = [];

        for(let i = 0; i <= (props.sizeField - 3); i++) {
            for(let j = 0; j <= (props.sizeField - 3); j++) {
                    winnerLines.push([tmplines[i][j], tmplines[i][j+1], tmplines[i][j+2]]) //1
                    winnerLines.push([tmplines[i+1][j], tmplines[i+1][j+1], tmplines[i+1][j+2]]) //2
                    winnerLines.push([tmplines[i+2][j], tmplines[i+2][j+1], tmplines[i+2][j+2]]) //3

                    winnerLines.push([tmplines[i][j], tmplines[i+1][j], tmplines[i+2][j]]) //4
                    winnerLines.push([tmplines[i][j+1], tmplines[i+1][j+1], tmplines[i+2][j+1]]) //5
                    winnerLines.push([tmplines[i][j+2], tmplines[i+1][j+2], tmplines[i+2][j+2]]) //6

                    winnerLines.push([tmplines[i][j], tmplines[i+1][j+1], tmplines[i+2][j+2]]) //7
                    winnerLines.push([tmplines[i][j+2], tmplines[i+1][j+1], tmplines[i+2][j]]) //8
            }
        }

        this.state = {
            xIsNext: true,
            history: Array(1).fill(Array(this.props.sizeField * this.props.sizeField).fill(null)),
            lines: winnerLines,
            stepNumber: 1,
        }
    }

    jumpTo(step: number) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 1,
        });
    }

    public handleClick(i: number) {
        const history: Array<Array<String>> = this.state.history.slice(0, this.state.stepNumber);
        const squares: Array<String> = history[history.length - 1].slice();
        if(squares[i] || (this.calculateWinner(squares) !== '')) return;
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        history.push(squares)
        this.setState({
            history: history,
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length,
        });
    }

    private calculateWinner(squares: Array<String>): String {
        for (let i = 0; i < this.state.lines.length; i++) {
            const [a, b, c] = this.state.lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return '';
    }

    render() {
        const squares: Array<String> = this.state.history[this.state.stepNumber - 1];
        const winner: String = this.calculateWinner(squares)
        
        let status: String;

        if (winner !== '') {
            status = 'Winner ' + String(winner)
        } else {
            status = 'Next move: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        const moves = this.state.history.map((step, move) => {
            const desc = move ?  'Go To Move #' + move : 'Start game';
            return (
                <li key={move}>
                    <Button variant="contained" color="secondary" onClick={() => this.jumpTo(move + 1)}>{desc}</Button>
                </li>
            );
        });

        return (
            <div className="game">
                <div className="game-board">
                    <Board size = {this.props.sizeField} squares = {squares} boardclick={(i) => this.handleClick(i)}/>
                </div>
            <div className="game-info">
                <Box width={40 * this.props.sizeField}><Alert variant="filled" severity="success" icon={false} >{status}</Alert></Box>
                <ol>{moves}</ol>
            </div>
            </div>
        );
    }
}