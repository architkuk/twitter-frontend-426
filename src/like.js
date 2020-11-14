import React from 'react';
import LikeImg from './heart.png';
import axios from 'axios';

export default class Like extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			likeNum: this.props.name,
			liked: this.props.isLiked,
			tweetId: this.props.tweetId,
			color: 'white',
		};
		this.handleLike = this.handleLike.bind(this);
		this.handleUnlike = this.handleUnlike.bind(this);
	}

	async refresh() {
		await axios({
			method: 'get',
			url: `https://comp426-1fa20.cs.unc.edu/a09/tweets/${this.state.tweetId}`,
			withCredentials: true,
		}).then((response) => {
			this.setState({
				likeNum: response.data.likeCount,
				liked: response.data.isLiked,
				color: this.state.liked ? 'green' : 'white',
			});
		});
	}

	async handleLike(event) {
		event.preventDefault();
		await axios({
			method: 'put',
			url: `https://comp426-1fa20.cs.unc.edu/a09/tweets/${this.state.tweetId}/like`,
			withCredentials: true,
		});
		await this.refresh();
	}

	async handleUnlike(event) {
		event.preventDefault();
		await axios({
			method: 'put',
			url: `https://comp426-1fa20.cs.unc.edu/a09/tweets/${this.state.tweetId}/unlike`,
			withCredentials: true,
		});
		await this.refresh();
	}

	render() {
		return (
			<div
				className={this.state.liked ? 'Liked' : 'Counter'}
				data-type='likeDiv'
				onClick={this.state.liked ? this.handleUnlike : this.handleLike}
			>
				<img src={LikeImg} alt='like' />
				<p className='Count'>{this.state.likeNum}</p>
			</div>
		);
	}
}
//<img src={LikeImg} className='SVG' alt='like' />
// LIKE IS NOT CLICKABLE RIGHT NOW
