import React from 'react'
import './Square.css'

export interface SquareProps {
    value: string;
    num: number;
    boardclick: (num: number) => void;
}

export class Square extends React.Component<SquareProps, {}> {
    public render() {
        return (
            <button className="square" onClick={this.click}>
                {this.props.value}
            </button>
        )
    }

    public click = () => {
        this.props.boardclick(this.props.num);
    }

}