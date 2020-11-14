import './App.css';
import React from 'react';
import Body from './body.js';
import Name from './name.js';
import Like from './like.js';
import Retweet from './retweet.js';
import ReplyCounter from './replyCount.js';
import trashcan from './trash-can.png';
import axios from 'axios';
import edit from './edit.png';

export default class Tweet extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isMine: this.props.isMine,
			id: this.props.tweetId,
			editMode: false,
			body: this.props.body,
		};
		this.destroy = this.destroy.bind(this);
		this.edit = this.edit.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	async destroy() {
		await axios({
			method: 'delete',
			url: `https://comp426-1fa20.cs.unc.edu/a09/tweets/${this.state.id}`,
			withCredentials: true,
		}).then((response) => window.location.reload(true));
	}

	edit() {
		this.setState({ editMode: !this.state.editMode });
	}

	handleChange(event) {
		this.setState({ body: event.target.value });
	}

	async handleSubmit(event) {
		event.preventDefault();
		await axios({
			method: 'put',
			url: `https://comp426-1fa20.cs.unc.edu/a09/tweets/${this.state.id}`,
			withCredentials: true,
			data: {
				body: this.state.body,
			},
		}).then((response) => window.location.reload(true));
	}

	render() {
		return (
			<div className='Tweet'>
				<Name name={this.props.name} />
				{this.state.isMine ? (
					<div>
						<input
							type='image'
							src={trashcan}
							alt='trashcan'
							onClick={this.destroy}
						/>
						<input type='image' src={edit} alt='edit' onClick={this.edit} />
					</div>
				) : (
					<div></div>
				)}
				{this.state.editMode ? (
					<form className='Body' onSubmit={this.handleSubmit}>
						<textarea onChange={this.handleChange}>{this.state.body}</textarea>
						<input type='submit' value='Submit' />
					</form>
				) : (
					<Body name={this.props.body} />
				)}
				<Retweet
					name={this.props.retweets}
					tweetId={this.props.tweetId}
					body={this.props.body}
				/>
				<Like
					name={this.props.likes}
					tweetId={this.props.tweetId}
					isLiked={this.props.isLiked}
				/>
				<ReplyCounter name={this.props.replies} tweetId={this.props.tweetId} />
			</div>
		);
	}
}
