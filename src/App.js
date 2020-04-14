import React from 'react';
import './App.css';
import BookList from "./BookList";
import TextField from "@material-ui/core/TextField";
import axios from "axios";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
			inputValue: ''
        }
		axios.get('http://localhost:10002/api/search/all')
                            .then(r => {
								
                                this.setState({data: r.data.results})
                            });
    }

    render() {
        return (
            <div className="App">
                <TextField
                    id="outlined-basic"
                    variant="outlined"
					value={this.state.inputValue}
					ref="myField"
                    onChange={event => {
						this.setState({
							inputValue: event.target.value
						})
						if(event.target.value) {
							axios.get('http://localhost:10002/api/search/byTitle?title='.concat(event.target.value))
						//axios.get('http://localhost:10002/api/search/all')
                            .then(r => {
								
                                this.setState({data: r.data.results})
                            });
						} else {
							axios.get('http://localhost:10002/api/search/all')
                            .then(r => {
								
                                this.setState({data: r.data.results})
                            });
						}
                    }}
                />
                <BookList data={this.state.data}/>
            </div>
        );
    }
}

export default App;