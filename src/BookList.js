import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import { Scrollbars } from 'react-custom-scrollbars';
import Book from "./Book";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        height: 400,
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        display: "flex",
        flexDirection: "column",
        overflow: 'auto',
        alignItems: "center",
        margin: 'auto',
        marginTop: 5,
        webkitScrollbar: 'hidden'
    },
}));

export default function BookList({data}) {
    const classes = useStyles();

    return (
        <List className={classes.root}>
            <Scrollbars>
            {data.map((book, i) => <Book key={i} data={book}/>)}
            </Scrollbars>
        </List>
    );
}