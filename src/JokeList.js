import React, { Component } from 'react';
import DadPic from './asset/dad.jpg'
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
	getNewJokes = () => {
		this.getJokes();
	};

	// defining vote method
	handleVotes(id, update) {
		this.setState(
			(state) => ({
				Jokes: state.Jokes.map((j) => (j.id === id ? { ...j, votes: j.votes + update } : j)),
			}),
			//after setting state, if I refresh I will still get the same jokes with the votes
			() => window.localStorage.setItem('Jokes', JSON.stringify(this.state.Jokes))
		);
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

		this.setState(
			(state) => ({ Jokes: [...state.Jokes, ...DadJokes] }),

			//after setting state, if I refresh I will still get the same jokes with the votes
			// Local storage can only store string so I need to convert joke to string
			//JSON.STringtify will covert my Dad Joke to string
			() => window.localStorage.setItem('Jokes', JSON.stringify(this.state.Jokes))
		);
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
						src={DadPic}
						alt="Dad Pic"
						id='dadpic'
					/>
					<button className="Jokes-getMore" onClick={this.getNewJokes}>
						New Jokes
					</button>
				</div>
				<div className="Jokes-found">{Jokerender}</div>
			</div>
		);
	}
}

export default JokeList;
