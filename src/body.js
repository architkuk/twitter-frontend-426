import React from 'react';

export default class Body extends React.Component {
	render() {
		return (
			<div className='Body'>
				<p>{this.props.name}</p>
			</div>
		);
	}
}
