import './App.css';
import React from 'react';
import axios from 'axios';
import Tweet from './tweet.js';
import Create from './create.js';

export default class App extends React.Component {
	constructor() {
		super();
		this.state = { tweets: [], reload: false, time: Date.now() };
		this.getTweets = this.getTweets.bind(this);
	}

	async getTweets() {
		await axios({
			method: 'get',
			url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets',
			withCredentials: true,
		}).then((response) => {
			this.setState({ tweets: response.data });
		});
	}

	componentDidMount() {
		this.getTweets();
	}

	componentWillUnmount() {}

	render() {
		let components = [];
		for (let tweet of this.state.tweets) {
			components.push(
				<Tweet
					key={tweet.id}
					tweetId={tweet.id}
					name={
						'' + tweet.author + (tweet.type === 'retweet' ? ' --> retweet' : '')
					}
					body={tweet.body}
					replies={tweet.replyCount}
					retweets={tweet.retweetCount}
					likes={tweet.likeCount}
					isMine={tweet.isMine}
					isLiked={tweet.isLiked}
				/>
			);
		}
		return (
			<div>
				<Create />
				{components}
			</div>
		);
	}
}
