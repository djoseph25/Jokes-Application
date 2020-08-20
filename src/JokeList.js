import React, { Component } from 'react';
import axios from 'axios';

class JokeList extends Component {
	static defaultProps = {
		NumofJokes: 10,
	};
	constructor(props) {
		super(props);
		this.state = { Jokes: [] };
	}

	async componentDidMount() {
		let DadJokes = [];
		while (DadJokes.length <= this.props.NumofJokes) {
			let response = await axios.get('https://icanhazdadjoke.com/', {
				headers: { Accept: 'application/json' },
				// I am getting the Html as well so I need to add some additional logic to just get the json file
			});
			DadJokes.push(response.data.joke);
		}
		// console.log(Jokes);
		this.setState({ Jokes: DadJokes });
	}

	render() {
		let Jokerender = this.state.Jokes.map((j) => <h4>{j}</h4>);
		return <div>{Jokerender}</div>;
	}
}

export default JokeList;
