import React from 'react'
import './Square.css'

export interface SquareProps {
    boardclick: () => void;
    value: String
}

export class Square extends React.Component<SquareProps, {}> {
    constructor(props: SquareProps){
        super(props)
        this.state = {value: ''}
    }

    public render() {
        return (
            <button className="square" onClick={this.props.boardclick}>
                {this.props.value}
            </button>
        )
    }

}