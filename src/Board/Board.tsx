import React from 'react'
import './Board.css'
import { Square } from '../Square'

export interface BoardState {
    squares: Array<String>;
    xIsNext: boolean;
}

export class Board extends React.Component<{}, BoardState> {
    constructor(props: any) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true
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
        console.log(squares)
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

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
        </div>
        )
    }

    public click(num: number) {
        console.log('Click ' + String(num) + ' !!!');
    }

    private calculateWinner(squares: Array<String>): String {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return '';
    }
}