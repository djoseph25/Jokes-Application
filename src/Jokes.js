import React, { Component } from 'react';
import './Jokes.css';

class Joke extends Component {
	//Setting my color function
	getColor() {
		if (this.props.votes >= 10) {
			return '#4CAF50';
		} else if (this.props.votes >= 8) {
			return '#8BC34A';
		} else if (this.props.votes >= 6) {
			return '#CDDC39';
		} else if (this.props.votes >= 4) {
			return '#FFEB3B';
		} else if (this.props.votes >= 2) {
			return '#FFC107';
		} else if (this.props.votes >= 1) {
			return '#FF9800';
		} else {
			return '#f44336';
		}
	}
	//Setting my emoji function retun
	getEmoji() {
		if (this.props.votes >= 10) {
			return 'em em-rolling_on_the_floor_laughing';
		} else if (this.props.votes >= 8) {
			return 'em em-laughing';
		} else if (this.props.votes >= 6) {
			return 'em em-smiley';
		} else if (this.props.votes >= 4) {
			return 'em em-slightly_smiling_face';
		} else if (this.props.votes >= 2) {
			return 'em em-neutral_face';
		} else if (this.props.votes >= 1) {
			return 'em em-confused';
		} else {
			return 'em em-angry';
		}
	}
	state = {};
	render() {
		return (
			<div className="Joke">
				<div className="Joke-buttons">
					<i className="fas fa-thumbs-up" onClick={this.props.upvotes}></i>
					<span className="Joke-vote" style={{ borderColor: this.getColor() }}>
						{this.props.votes}
					</span>
					<i className="fas fa-thumbs-down" onClick={this.props.downvotes}></i>
				</div>
				<div className="Joke-text">{this.props.text}</div>
				<div className="Joke-Emoji">
					{/* <i className="em em-rolling_on_the_floor_laughing" /> */}
					<i className={this.getEmoji()} />
				</div>
			</div>
		);
	}
}

export default Joke;
