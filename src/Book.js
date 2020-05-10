import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import RedactionForm from "./RedactionForm";
import {makeStyles} from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    book: {
        width: '100%',
    },
}));


export default function Book(props) {
    const classes = useStyles();
    const ref = React.createRef()
    const [book, setBook] = React.useState(props.data);


    return (
        <div className={classes.book}>
            <ListItem button onMouseDown={event => ref.current.activate()}>
                <ListItemAvatar>
                    <Avatar>
                        <ImageIcon/>
                    </Avatar>
                </ListItemAvatar>
				<div id="rootBook"><ListItemText primary={book.title} secondary={book.authors.map((author) => author.firstName + ' ' + author.lastName).join(';')}/></div>
                <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="comments" onMouseDown={event => props.delete(book.id)}>
                        <DeleteIcon/>
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
            <RedactionForm ref={ref} data={book} updateList={() => props.updateList()}/>
        </div>
    );
}