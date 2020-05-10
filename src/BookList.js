import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import {Scrollbars} from 'react-custom-scrollbars';
import Book from "./Book";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        height: 400,
        maxWidth: 600,
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

export default function BookList(props) {
    const classes = useStyles();	

    return (
        <List className={classes.root}>
			{console.log(props.data)}
            <Scrollbars>
                {props.data.map((book, i) => {
					if (book) {
                        return <Book key={book.id} data={book} delete={(id) => props.delete(id)} updateList={() => props.updateList()}/>;
                    }
                })}
            </Scrollbars>
        </List>
    );
}