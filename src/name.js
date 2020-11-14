import React from 'react';

export default class Name extends React.Component {
	render() {
		return (
			<div className='Name'>
				<p>{this.props.name}</p>
			</div>
		);
	}
}
