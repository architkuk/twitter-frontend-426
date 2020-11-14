import React from 'react';
import WriteTweet from './writeTweet.js';

export default class Create extends React.Component {
	constructor() {
		super();
		this.state = { isClicked: false };
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		this.setState((state) => ({
			isClicked: !state.isClicked,
		}));
	}

	render() {
		return (
			<div className='Create'>
				<button onClick={this.handleClick}>Create Tweet</button>
				{this.state.isClicked ? <WriteTweet className='WriteTweet' /> : <></>}
			</div>
		);
	}
}
