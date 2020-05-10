import React from 'react';
import './App.css';
import BookList from "./BookList";
import TextField from "@material-ui/core/TextField";
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import RedactionForm from "./RedactionForm";
import axios from "axios";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
        this.book = {
            title: '',
            authors: [],
            genre: '',
            language: '',
        }
        this.state = {
            data: [],
            inputValue: ''
        }
        axios.get('http://localhost:10002/api/search/all')
            .then(r => {
				console.log(r.data.results);
                this.setState({data: r.data.results})
            });
    }

    loadRes(value) {
        this.setState({
            inputValue: value
        });
		this.setState({data: []})
        if (value) {
            axios.get('http://localhost:10002/api/search/byTitle?title='.concat(value))
                .then(r => {
                    this.setState({data: r.data.results})
                });
        } else {
            axios.get('http://localhost:10002/api/search/all')
                .then(r => {
                    this.setState({data: r.data.results})
                });
        }
    };
	
	deleteItem(id) {
		this.setState(prevState => ({	
			data: prevState.data.filter(el => el.id !== id)
		}));
		axios.delete('http://localhost:10001/api/books/'.concat(id));
	}

    render() {
        return (
            <div className="App">
                <TextField
                    id="outlined-basic"
                    variant="outlined"
                    value={this.state.inputValue}
                    ref="myField"
                    onChange={e => this.loadRes(e.target.value)}
                />
                <IconButton onClick={event => this.ref.current.activate()}>
                    <AddIcon/>
                </IconButton>
                <div style={{maxWidth: 600, margin: 'auto'}}>
                    <RedactionForm ref={this.ref} data={this.book} isCreate='true'/>
                </div>
                <BookList data={this.state.data} delete={(id) => this.deleteItem(id)} updateList={() => this.loadRes(this.state.inputValue) } />
            </div>
        );
    }
}

export default App;