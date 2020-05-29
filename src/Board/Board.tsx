import React from 'react'
import './Board.css'
import { Square } from '../Square'

export interface BoardProps {
    size: number;
    squares: Array<String>;
    boardclick: (num: number) => void;
}

export class Board extends React.Component<BoardProps, {}> {

    public renderSquare(i: number) {
        return (
            <Square value={this.props.squares[i]} boardclick={() => this.props.boardclick(i)} key={i}/>
        );
    }

    public render() {
        
        let items = []
        
        for (let i = 0; i < this.props.size; i++) {
            let rows = []
            for (let j = 0; j < this.props.size; j++) {
                rows.push(this.renderSquare(i * this.props.size + j));
            }
            items.push(<div className="board-row">{rows}</div>)
        }

    return (<div>{items}</div>)

    }

    
}