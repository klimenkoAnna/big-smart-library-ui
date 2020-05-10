import React from 'react';
import Collapse from '@material-ui/core/Collapse';
import {makeStyles} from '@material-ui/core/styles';
import {useState} from "react";
import TextField from '@material-ui/core/TextField';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import ListSubheader from '@material-ui/core/ListSubheader';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import axios from "axios";


const {forwardRef, useImperativeHandle} = React;


const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        margin: 5,
    },
    textField: {
        margin: 5,
    },
    titleField: {
        margin: 5,
        minWidth: 450
    },
    subHeaderAuthors: {
        display: 'inline-block',
        marginLeft: 10,
    }
}));

function useForceUpdate() {
  let [value, setState] = useState(true);
  return () => setState(!value);
}

const RedactionForm = forwardRef((props, ref) => {
    const classes = useStyles();
    const [checked, setChecked] = React.useState(false);
    const [book, setBook] = React.useState(props.data);
	let forceUpdate = useForceUpdate();

    const handleChange = () => {
        setChecked((prev) => !prev);
    };
	

    useImperativeHandle(ref, () => ({
        activate() {
            handleChange();
        }
    }));

    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <Collapse in={checked} unmountOnExit>
                    <GridList cellHeight={80} className={classes.gridList}>
                        <GridListTile key="title" cols={2}>
                            <TextField
                                id="titleField"
                                defaultValue={props.data.title}
                                label="Title"
                                variant="outlined"
                                className={classes.titleField}
                                onChange={(e) => book.title = e.target.value}
                            />
                        </GridListTile>
                        <GridListTile key="genre">
                            <TextField
                                id="genreField"
                                defaultValue={props.data.genre}
                                label="Genre"
                                variant="outlined"
                                className={classes.textField}
                                onChange={(e) => book.genre = e.target.value}
                            />
                        </GridListTile>
                        <GridListTile key="language">
                            <TextField
                                id="languageField"
                                defaultValue={book.language}
                                label="Language"
                                variant="outlined"
                                className={classes.textField}
                                onChange={(e) => book.language = e.target.value}
                            />
                        </GridListTile>
                        <GridListTile key="Subheader1" cols={2} style={{height: 'auto'}}>
                            <ListSubheader component="div">
                                <div className={classes.subHeaderAuthors}> Authors</div>
									<IconButton onClick={event => {
										book.authors.push({firstName: "", lastName: ""});
										forceUpdate();																														
									}}>
										<AddIcon/>
									</IconButton>
                            </ListSubheader>
                        </GridListTile>
                        {Object.values(book.authors).map(a => (
                                <GridListTile cols={2} key={a.id + a.firstName}>
                                    <TextField
                                        id={a.id + a.firstName}
                                        defaultValue={a.firstName}
                                        label="Author First Name"
                                        variant="outlined"
                                        className={classes.textField}
                                        onChange={(e) => a.firstName = e.target.value}
                                    />
									<TextField
                                        id={a.id}
                                        defaultValue={a.lastName}
                                        label="Author Last Name"
                                        variant="outlined"
                                        className={classes.textField}
                                        onChange={(e) => {a.lastName = e.target.value}}
                                    />
                                </GridListTile>
                        ))}
                        <GridListTile key="Subheader2" cols={2} style={{height: 'auto'}}>
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                className={classes.button}
                                startIcon={<SaveIcon/>}
                                onClick={() => {
                                    if (!props.isCreate) {
                                        console.log(JSON.stringify(book));
										book.authors.filter(a => a.firstName  === "");
                                        axios.post('http://localhost:10001/api/books/update', JSON.stringify(book), {
                                            headers: {
                                                'Content-Type': 'application/json',
                                            }
                                        }).then(r => props.updateList(book));
                                        console.log(book);

                                    } else {
                                        book.customerId = 1;
										book.authors.filter(a => a.firstName  === "");
                                        console.log(JSON.stringify(book));
                                        axios.post('http://localhost:10001/api/books/save', JSON.stringify(book), {
                                            headers: {
                                                'Content-Type': 'application/json',
                                            }
                                        });
                                    }
                                    handleChange();
                                }}
                            >
                                {props.isCreate ? 'Save' : 'Update'}
                            </Button>
                        </GridListTile>
                    </GridList>
                </Collapse>
            </div>
        </div>
    );
});

export default RedactionForm