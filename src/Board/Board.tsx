import React from 'react'
import './Board.css'
import { Square } from '../Square'

export class Board extends React.Component {
    public render() {
        return (
            <div>
                <div className="board-row">
                    <Square value={''} num={1} boardclick = {this.click} />
                    <Square value={''} num={2} boardclick = {this.click} />
                    <Square value={''} num={3} boardclick = {this.click} />
                </div>
                <div className="board-row">
                    <Square value={''} num={4} boardclick = {this.click} />
                    <Square value={''} num={5} boardclick = {this.click} />
                    <Square value={''} num={6} boardclick = {this.click} />
                </div>
                <div className="board-row">
                    <Square value={''} num={7} boardclick = {this.click} />
                    <Square value={''} num={8} boardclick = {this.click} />
                    <Square value={''} num={9} boardclick = {this.click} />
                </div>
        </div>
        )
    }

    public click(num: number) {
        console.log('Click ' + String(num) + ' !!!')
    }
}