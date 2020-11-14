import React from 'react';
import RetweetImg from './retweet.png';
import axios from 'axios';

export default class Retweets extends React.Component {
	constructor(props) {
		super(props);
		this.state = { tweetId: this.props.tweetId, body: this.props.body };
		this.postRetweet = this.postRetweet.bind(this);
	}
	async postRetweet(event) {
		event.preventDefault();
		await axios({
			method: 'post',
			url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets',
			withCredentials: true,
			data: {
				type: 'retweet',
				parent: this.state.tweetId,
				body: this.state.body,
			},
		}).then((response) => window.location.reload(true));
	}
	render() {
		return (
			<div
				className='Counter'
				data-type='retweetDiv'
				onClick={this.postRetweet}
			>
				<img src={RetweetImg} alt='retweet' />
				<p className='Count'>{this.props.name}</p>
			</div>
		);
	}
}
