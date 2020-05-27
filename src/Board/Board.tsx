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
        return (
            <div>
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
}