import React from 'react'
import Button from '@material-ui/core/Button';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => createStyles({
    square: {
        minWidth: '40px',
        maxWidth: '40px',
        minHeight: '40px',
        maxHeight: '40px',
        fontSize: '40px',
    },
    })
);



export interface SquareProps {
    boardclick: () => void;
    value: String;
    num: number;
}

export function Square(props:SquareProps) {
        
    const classes = useStyles()
        
        return (
            <Button variant="contained" color="primary" onClick={() => props.boardclick()} className={classes.square} key={props.num}>
                {props.value}
            </Button>
        )
    }
