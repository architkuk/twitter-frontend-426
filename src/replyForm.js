import React from 'react';
import axios from 'axios';

export default class ReplyForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = { id: this.props.tweetId, body: '' };
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		this.setState({ body: event.target.value });
	}

	async handleSubmit(event) {
		event.preventDefault();
		await axios({
			method: 'post',
			url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets',
			withCredentials: true,
			data: {
				type: 'reply',
				parent: this.state.id,
				body: this.state.body,
			},
		}).then((response) => window.location.reload(true));
	}

	render() {
		return (
			<div className='ReplyForm'>
				<form onSubmit={this.handleSubmit}>
					<textarea onChange={this.handleChange}></textarea>
					<input type='submit' value='Send Reply' />
				</form>
			</div>
		);
	}
}
