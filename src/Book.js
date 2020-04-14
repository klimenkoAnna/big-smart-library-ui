import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';

export default function Book(props) {
    return (
        <ListItem button onMouseDown={event => console.log(event)}>
            <ListItemAvatar>
                <Avatar>
                    <ImageIcon/>
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={props.data.title} secondary={props.data.authors}/>
        </ListItem>
    );
}