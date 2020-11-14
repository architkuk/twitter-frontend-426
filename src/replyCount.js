import React from 'react';
import ReplyImg from './reply.png';
import ReplyForm from './replyForm.js';

export default class ReplyCounter extends React.Component {
	constructor() {
		super();
		this.state = { isClicked: false };
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		this.setState({ isClicked: !this.state.isClicked });
	}

	render() {
		return (
			<>
				<div
					className='Counter'
					data-type='replyDiv'
					onClick={this.handleClick}
				>
					<img src={ReplyImg} alt='reply' />
					<p className='Count'>{this.props.name}</p>
				</div>
				{this.state.isClicked ? (
					<ReplyForm tweetId={this.props.tweetId} />
				) : (
					<></>
				)}
			</>
		);
	}
}
