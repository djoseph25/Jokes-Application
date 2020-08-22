import React, { Component } from 'react';
import axios from 'axios';
import './JokeList.css';
import Joke from './Jokes';
import { v4 as uuidv4 } from 'uuid';

class JokeList extends Component {
	static defaultProps = {
		NumofJokes: 10,
	};
	constructor(props) {
		super(props);
		//Update state instead of an empty array it will retrieve
		//10 joke from local storage first if there none give me 10 random jokes
		this.state = { Jokes: JSON.parse(window.localStorage.getItem('Jokes')) || [] };
	}
	// defining vote method
	handleVotes(id, update) {
		this.setState((state) => ({
			Jokes: state.Jokes.map((j) => (j.id === id ? { ...j, votes: j.votes + update } : j)),
		}));
	}

	componentDidMount() {
		if (this.state.Jokes.length === 0) this.getJokes();
	}

	async getJokes() {
		let DadJokes = [];
		while (DadJokes.length <= this.props.NumofJokes) {
			let response = await axios.get('https://icanhazdadjoke.com/', {
				headers: { Accept: 'application/json' },
				// I am getting the Html as well so I need to add some additional logic to just get the json file
			});
			DadJokes.push({ id: uuidv4(), text: response.data.joke, votes: 0 });
		}
		// console.log(Jokes);
		this.setState({ Jokes: DadJokes });
		// Local storage can only store string so I need to convert joke to string
		//JSON.STringtify will covert my Dad Joke to string
		window.localStorage.setItem('Jokes', JSON.stringify(DadJokes));
	}
	render() {
		let Jokerender = this.state.Jokes.map((j) => (
			<Joke
				key={j.id}
				votes={j.votes}
				text={j.text}
				upvotes={() => this.handleVotes(j.id, 1)}
				downvotes={() => this.handleVotes(j.id, -1)}
			/>
		));
		return (
			<div className="Jokes">
				<div className="Jokes-Sidebar">
					<h1 className="Jokes-title">Funny Dad Jokes</h1>
					<img
						src="https://lh3.googleusercontent.com/proxy/Kz_r897BIdXxql30f0dVguVREDSx3iuE6aDyk3JnTTsgAFy4zKYCryBkurX1X5RL620JG2VWLQvDdoz-6p96uA8fnAKTpJw"
						alt="Dad Pic"
					/>
					<button className="Jokes-getMore">New Jokes</button>
				</div>
				<div className="Jokes-found">{Jokerender}</div>
			</div>
		);
	}
}

export default JokeList;
