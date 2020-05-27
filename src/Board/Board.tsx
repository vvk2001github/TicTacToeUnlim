import React from 'react'
import './Board.css'
import { Square } from '../Square'

export interface BoardProps {
    size: number
}

export interface BoardState {
    squares: Array<String>;
    xIsNext: boolean;
    lines:number[][];
}

export class Board extends React.Component<BoardProps, BoardState> {

    constructor(props: BoardProps) {
        super(props);

        //Calculate winner items
        var tmplines:number[][] = [];

        for(let i = 0; i < props.size; i++) {
            tmplines[i] = Array(props.size)
            for(let j = 0; j < props.size; j++) {
                tmplines[i][j] = i * props.size + j
            }
        }        
        const winnerLines:any = [];

        for(let i = 0; i <= (props.size - 3); i++) {
            for(let j = 0; j <= (props.size - 3); j++) {
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

        console.log(winnerLines);

        this.state = {
            squares: Array(this.props.size * this.props.size).fill(null),
            xIsNext: true,
            lines: winnerLines,
        };

        
    }

    public handleClick(i: number) {
        const squares = this.state.squares.slice();
        if(squares[i] || (this.calculateWinner(squares) !== '')) return;
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext
        });
    }

    public renderSquare(i: number) {
        return (
            <Square value={this.state.squares[i]} boardclick={() => this.handleClick(i)} />
        );
    }

    public render() {

        const winner: String = this.calculateWinner(this.state.squares)
        
        let status: String;

        if (winner !== '') {
            status = 'Выиграл ' + String(winner)
        } else {
            status = 'Следующий ход: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        let items = []
        for (let i = 0; i < this.props.size; i++) {
            let rows = []
            for (let j = 0; j < this.props.size; j++) {
                rows.push(this.renderSquare(i * this.props.size + j));
            }
            items.push(<div className="board-row">{rows}</div>)
        }

    return (<div><div className="status">{status}</div>{items}</div>)

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
}