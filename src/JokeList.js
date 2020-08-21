import React, { Component } from 'react';
import axios from 'axios';
import './Jokes.css';

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
		return (
			<div className="Jokes">
				<div className="Jokes-Sidebar">
					<h1 className="Jokes-title">Funny Dad Jokes</h1>
					<img
						src="https://lh3.googleusercontent.com/proxy/VdryVZO3Eh9Jh4XhMbrD6VGqMTuMxNhHB0Dbs7UKOQ7NV-KVhqpYq921kKcWENcudecofJjTvtuveT0s_Kn7n9r3MOVR6xI"
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
